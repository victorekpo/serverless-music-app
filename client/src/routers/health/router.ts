import { fetchApi } from "@/fetch";

export const healthHandler = async () => {
  const backendApiUrl = `${API_URL}/health`;

  console.log("DYNAMIC API URL", backendApiUrl);

  const { data, error } = await fetchApi(backendApiUrl);

  const backendRes = data ? data.message : error;

  const res = {
    client: 'success',
    server: backendRes
  }

  return new Response(JSON.stringify(res), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
