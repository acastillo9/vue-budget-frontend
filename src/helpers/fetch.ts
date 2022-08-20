async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    const error = new Error("Error requesting server");
    error.name = String(response.status);
    error.message = response.statusText;
    throw error;
  }

  return response.json().catch(() => ({}));
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
