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

const normalizeResult = async (response: Response) => {
  const responseData = await response.json();
  if (responseData.message != null) {
    throw new Error(responseData.message);
  }
};

const authorizedFetch = (input: FetchInput, init: FetchInit) => {
  //TODO: get the actual token once the login in implemented
  const DEMO_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnFsbGVjYTAwMDA0MjB5amljY2V3bnIiLCJpYXQiOjE3MTQ3NTQxMzUsImV4cCI6MTcxNDg0MDUzNSwiaXNzIjoiY3VsZXJvIn0.QoxtluUTZ1YKYrNQQvUttYYE-5YTPuqjajhrS4yE8Xo";
  return enhancedFetch(
    input,
    init,
    [
      addHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEMO_TOKEN}`,
      }),
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

export async function searchUser(query: string) {
  return authorizedFetch(``, {});
}
