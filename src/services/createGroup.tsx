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

export async function getAllGroups(token: string) {
  try {
    const response = await fetch(`${URL}/createGroup`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteGroup(token: string, groupId: string) {
  try {
    const response = await fetch(`${URL}/createGroup`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        groupId: groupId,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}
