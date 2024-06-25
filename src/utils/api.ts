import {
  Connection,
  User,
  UserSettings,
  UserWithCounts,
  UserWithToken,
} from "../types";
import { DbNotification } from "../types/Notification";
import { Rating } from "../types/Rating";
import { Review } from "../types/Review";
import storage from "./storage";
import Base64 from "Base64";

// @ts-ignore TODO: Fix this
export const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const verifyEmailUrl = `${baseUrl}/auth/verify-email`;

type FetchInput = string | URL | Request;
type FetchInit = RequestInit;

const enhancedFetch = async (
  initialInput: FetchInput,
  initialInit: FetchInit,
  preRequestMiddlewares?: Array<
    (
      input: FetchInput,
      init: FetchInit
    ) => { input: FetchInput; init: FetchInit }
  >,
  afterRequestMiddlewares?: Array<(before: any) => any>
) => {
  const inputWithMiddlewares = (preRequestMiddlewares || []).reduce<{
    input: FetchInput;
    init: FetchInit;
  }>(({ input, init }, middleware) => middleware(input, init), {
    input: initialInput,
    init: initialInit,
  });
  const result = fetch(inputWithMiddlewares.input, inputWithMiddlewares.init);

  const processedResult = await (afterRequestMiddlewares || []).reduce(
    async (previosPromise, nextFn) => {
      const prevResult = await previosPromise;
      return nextFn(prevResult);
    },
    result
  );

  return processedResult;
};

const addHeaders = (headers: HeadersInit) => {
  return (input: FetchInput, init: FetchInit) => ({
    input,
    init: { ...init, headers: { ...headers, ...init.headers } },
  });
};

const stringifyBody = () => {
  return (input: FetchInput, init: FetchInit) => ({
    input,
    init: { ...init, body: JSON.stringify(init.body) },
  });
};

// used in development.
const simulateSlowNetwork = async (response: Response): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 5000);
  });
};

const normalizeResult = async (response: Response) => {
  const responseData = await response.json();
  if (responseData.message != null) {
    throw new Error(responseData.message);
  }

  return responseData;
};

export const authorizedFetch = async (
  input: FetchInput,
  init: FetchInit | object
): Promise<any> => {
  const token = await storage.getItem(storage.TOKEN_KEY);

  return enhancedFetch(
    input,
    init,
    [
      addHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      stringifyBody(),
    ],
    [
      /** Uncomment next line in dev mode to check how the app behaves
       * when the api connection is sLoW
       */
      // simulateSlowNetwork,
      normalizeResult,
    ]
  );
};

export type AuthInput = {
  email: string;
};

export async function authenticate(email: AuthInput["email"]): Promise<User> {
  const response = await fetch(`${baseUrl}/auth/send-verification-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  } else {
    throw new Error(responseData.message);
  }
}

export type VerifyEmailInput = {
  email: string;
  code: string;
};

export async function verifyEmail(
  email: VerifyEmailInput["email"],
  code: VerifyEmailInput["code"]
): Promise<UserWithToken> {
  const response = await fetch(verifyEmailUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
}

export async function getSearchUserResult(query: string) {
  return authorizedFetch(
    `${baseUrl}/connections/search/${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );
}

export async function getMe(): Promise<User> {
  return authorizedFetch(`${baseUrl}/user`, { method: "GET" });
}

export type RegenerateCodeInput = {
  email: string;
};
export async function regenerateCode(data: RegenerateCodeInput) {
  return enhancedFetch(`${baseUrl}/auth/regenerate-code/${data.email}`, {
    method: "PUT",
  });
}

export type UpdateProfileData = {
  name?: string;
  headline?: string;
  location?: string;
};

export async function updateProfileData(data: UpdateProfileData) {
  return authorizedFetch(`${baseUrl}/user`, {
    method: "PUT",
    body: data,
  });
}

export async function updateProfilePicture(uri: string) {
  return authorizedFetch(`${baseUrl}/user/profile-picture`, {
    method: "PUT",
    body: { file: uri },
  });
}

export async function getConnection(userId: User["id"]): Promise<Connection> {
  return authorizedFetch(`${baseUrl}/connections/${userId}`, {
    method: "GET",
  });
}

export async function getUserAvgRatings(userId: User["id"]): Promise<Rating> {
  return authorizedFetch(`${baseUrl}/reviews/avg-rating/${userId}`, {
    method: "GET",
  });
}

export async function getUserReviews(userId: User["id"]): Promise<Review[]> {
  return authorizedFetch(`${baseUrl}/reviews/${userId}`, {
    method: "GET",
  });
}

export async function likeReview(reviewId: Review["id"]): Promise<Review> {
  return authorizedFetch(`${baseUrl}/reviews/${reviewId}/like`, {
    method: "POST",
  });
}

export async function unlikeReview(reviewId: Review["id"]): Promise<Review> {
  return authorizedFetch(`${baseUrl}/reviews/${reviewId}/like`, {
    method: "DELETE",
  });
}

export async function getPlatformWideReviews(): Promise<Review[]> {
  return authorizedFetch(`${baseUrl}/reviews/latest`, { method: "GET" });
}

export async function getConnections(): Promise<Connection[]> {
  return authorizedFetch(`${baseUrl}/connections`, {
    method: "GET",
  });
}

export async function getSuggestedForReviewConnections(): Promise<
  Connection[]
> {
  return authorizedFetch(`${baseUrl}/connections`, {
    method: "GET",
  });
}

export async function connectWithUser(
  userId: Connection["id"]
): Promise<Connection> {
  return authorizedFetch(`${baseUrl}/connections/connect/${userId}`, {
    method: "POST",
  });
}

export async function unconnectWithUser(
  userId: Connection["id"]
): Promise<Connection> {
  return authorizedFetch(`${baseUrl}/connections/connect/${userId}`, {
    method: "DELETE",
  });
}

export async function searchByUserLink(link: string): Promise<Connection> {
  return authorizedFetch(
    `${baseUrl}/connections/search-by-external-profile/${Base64.btoa(link)}`,
    { method: "GET" }
  );
}

export type SendReviewData = {
  professionalism: number;
  reliability: number;
  communication: number;
  comment: string;
  anonymous: boolean;
};

export async function sendReview(ratedUserId: string, data: SendReviewData) {
  return authorizedFetch(`${baseUrl}/reviews`, {
    method: "POST",
    body: {
      postedToId: ratedUserId,
      review: data,
    },
  });
}

export async function getMyReviewForUser(userId: string): Promise<Review> {
  return authorizedFetch(`${baseUrl}/reviews/my-review/${userId}`, {
    method: "GET",
  });
}

export async function deleteReview(reviewId: string) {
  return authorizedFetch(`${baseUrl}/reviews/${reviewId}`, {
    method: "DELETE",
  });
}

export async function updateReview(
  reviewId: string,
  reviewData: SendReviewData
): Promise<Review> {
  return authorizedFetch(`${baseUrl}/reviews/${reviewId}`, {
    method: "PUT",
    body: reviewData,
  });
}

export async function addPushToken(token: string) {
  return authorizedFetch(`${baseUrl}/notifications/token`, {
    method: "POST",
    body: { token },
  });
}

export async function getNotifications(): Promise<DbNotification[]> {
  return authorizedFetch(`${baseUrl}/notifications`, { method: "GET" });
}

export async function getReviewsPostedByMe(): Promise<Review[]> {
  return authorizedFetch(`${baseUrl}/reviews/posted`, { method: "GET" });
}

export async function getReviewdUsers(): Promise<Connection[]> {
  return authorizedFetch(`${baseUrl}/connections/reviewed`, { method: "GET" });
}

export async function getUserSettings(): Promise<UserSettings> {
  return authorizedFetch(`${baseUrl}/user/settings`, { method: "GET" });
}

export type UpdateUserSettingsData = {
  reviewsVisible?: boolean;
  anonymous?: boolean;
};
export async function updateUserSettings(
  data: UpdateUserSettingsData
): Promise<UserSettings> {
  return authorizedFetch(`${baseUrl}/user/settings`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteAccount() {
  return authorizedFetch(`${baseUrl}/user`, { method: "DELETE" });
}
