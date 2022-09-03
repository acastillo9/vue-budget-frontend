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
    const data = text && JSON.parse(text);

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
