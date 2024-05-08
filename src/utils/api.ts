const baseUrl = "http://localhost:4200/api";
const signInUrl = `${baseUrl}/auth/sign-in`;
const signUpUrl = `${baseUrl}/auth/sign-up`;
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

const normalizeResult = async (response: Response) => {
  const responseData = await response.json();
  if (responseData.message != null) {
    throw new Error(responseData.message);
  }

  return responseData;
};

const authorizedFetch = (
  input: FetchInput,
  init: FetchInit | object
): Promise<any> => {
  //TODO: get the actual token once the login in implemented
  const DEMO_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnFsbGVjYTAwMDA0MjB5amljY2V3bnIiLCJpYXQiOjE3MTUxNjc3MTEsImV4cCI6MTcxNTI1NDExMSwiaXNzIjoiY3VsZXJvIn0.L8tyPW8UuaUt58yKiTAa2g9KTgn87y0-wWz1STDdieI";
  return enhancedFetch(
    input,
    init,
    [
      addHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEMO_TOKEN}`,
      }),
      stringifyBody(),
    ],
    [normalizeResult]
  );
};

export async function signUp(
  email: string,
  password: string
): Promise<boolean> {
  const response = await fetch(signUpUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const responseData = await response.json();
  if (responseData.message != null) {
    throw new Error(responseData.message);
  }
  return true;
}

export async function verifyEmail(
  email: string,
  code: string
): Promise<boolean> {
  const response = await fetch(verifyEmailUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const responseData = await response.json();

  if (responseData.message != null) {
    throw new Error(responseData.message);
  }
  if (responseData.token == null) {
    throw new Error(responseData.message);
  }
  return responseData;
}

export async function signInUser(
  email: string,
  password: string
): Promise<void> {
  try {
    const response = await fetch(signInUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();

    if (responseData.token == null) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function getSearchUserResult(query: string) {
  return authorizedFetch(
    `${baseUrl}/user/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );
}

export type SendReviewData = {
  professtionalsim: number;
  reliability: number;
  communication: number;
  comment: string;
  anonymous: boolean;
};

export async function sendFeedback(ratedUserId: string, data: SendReviewData) {
  return authorizedFetch(`${baseUrl}/user/rate/${ratedUserId}`, {
    method: "POST",
    body: data,
  });
}
