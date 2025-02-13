const URL = import.meta.env.VITE_API_URL;

export const getUser = async (token: string) => {
  const response = await fetch(`${URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
