const URL = import.meta.env.VITE_API_URL;

console.log(URL);

export async function getAllComments() {
  const url = `${URL}/post`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de requête fetch :", error);
  }
}

export async function postNewComment(newComment: string, author: string) {
  const url = `${URL}/post`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: newComment,
        author: author,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de requête fetch :", error);
  }
}

export async function fetchDelete(id: string) {
  try {
    const response = await fetch(`${URL}/post/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de requête fetch :", error);
  }
}

export async function fetchUpdate(id: string, commentUpdated: string) {
  try {
    const response = await fetch(`${URL}/post/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: commentUpdated,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de requête fetch :", error);
  }
}
