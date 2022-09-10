import { useAuthStore } from "@/stores/auth";

async function http<T>(path: string, config: RequestInit): Promise<T> {
  config.headers = {
    ...config.headers,
    ...authHeader(path),
  };
  const request = new Request(path, config);
  const response = await fetch(request);

  return handleResponse(response);
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", ...config };
  return await http<T>(path, init);
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    method: "post",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
    ...config,
  };
  return await http<U>(path, init);
}

export async function remove(
  path: string,
  config?: RequestInit
): Promise<void> {
  const init = { method: "delete", ...config };
  return await http<void>(path, init);
}

function authHeader(url: string) {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.access_token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.access_token}` };
  } else {
    return {};
  }
}

async function handleResponse(response: Response) {
  return response.text().then((text: string) => {
    function dateReviver(key, value) {
      // If the value is a string and if it roughly looks like it could be a
      // JSON-style date string go ahead and try to parse it as a Date object.
      if (
        "string" === typeof value &&
        /^\d{4}-[01]\d-[0-3]\dT[012]\d(?::[0-6]\d){2}\.\d{3}Z$/.test(value)
      ) {
        const date = new Date(value);
        // If the date is valid then go ahead and return the date object.
        if (+date === +date) {
          return date;
        }
      }
      // If a date was not returned, return the value that was passed in.
      return value;
    }
    const data = text && JSON.parse(text, dateReviver);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
