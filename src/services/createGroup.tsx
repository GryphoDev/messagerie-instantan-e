const URL = import.meta.env.VITE_API_URL;

export async function createNewGroup(
  token: string,
  groupName: string,
  groupTheme: string
) {
  try {
    const response = await fetch(`${URL}/createGroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
        groupName: groupName,
        groupTheme: groupTheme,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}
