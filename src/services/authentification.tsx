const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchRegister(username: string, password: string) {
  try {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchLogin(username: string, password: string) {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}
