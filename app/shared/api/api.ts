export const apiClient = (() => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  async function request(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(response.statusText);
      error.response = response;
      error.data = errorData;
      throw error;
    }

    return response.json();
  }

  return {
    get: (path: string) => request(path),
    post: (path: string, body) =>
      request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    put: (path: string, body) =>
      request(path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    patch: (path: string, body) =>
      request(path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    delete: (path: string) =>
      request(path, {
        method: "DELETE",
      }),
  };
})();
