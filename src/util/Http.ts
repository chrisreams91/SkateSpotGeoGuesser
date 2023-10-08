const http = async (
  route: string,
  method: "GET" | "PUT" | "POST" = "GET",
  body?: any
) => {
  const res = await fetch(route, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return json;
};

export default http;
