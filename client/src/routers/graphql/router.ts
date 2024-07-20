import { fetchApi } from "@/fetch";

const JsonHeader = {
  'Content-Type': 'application/json', // Ensure the Content-Type header is set
};

export const graphqlHandler = async (req) => {
  const parsedBody = await req.json();

  const backendApiUrl = `${API_URL}/graphql`;

  const { data, error } = await fetchApi(backendApiUrl, {
    method: req.method,
    headers: {
      ...JsonHeader // important to declare the type of body
    },
    ...(req.body && { body: parsedBody })
  });

  const res = data ? data : error;

  return new Response(JSON.stringify(res), {
    headers: {
      ...JsonHeader
    }
  });
};