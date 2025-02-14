const URL = import.meta.env.VITE_API_URL;

interface PostInvitationResponse {
  message: string;
  ok: boolean;
}
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
    const data = await response.json();
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
    const data = await response.json();
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
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function postInvitation(
  token: string,
  groupId: string,
  invitation: string
): Promise<PostInvitationResponse> {
  try {
    const response = await fetch(`${URL}/createGroup`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        groupId: groupId,
        usernameOfInvited: invitation,
      }),
    });
    const data = await response.json();
    return {
      message: data.message,
      ok: response.ok,
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { message: "Erreur réseau ou serveur", ok: false };
  }
}
