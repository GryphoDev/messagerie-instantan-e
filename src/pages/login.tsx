import { Link } from "react-router-dom";
import { fetchLogin } from "../services/authentification";
import { FormEvent, useState } from "react";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetchLogin(username, password);

    const token = response.token;
    if (!token) {
      alert(response.message);
      return;
    }
    localStorage.setItem("token", token);
    alert("Connexion établie !!");
    window.location.href = "/home";
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-11/12 py-10 gap-8 mx-auto max-w-md min-h-screen -mt-[101px]"
        action="#"
      >
        <h2 className="text-2xl mb-10 text-yellow-600">Connexion </h2>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <label htmlFor="userNameLogin">Nom d'utilisateur :</label>
            <input
              id="userNameLogin"
              className="border-1 border-neutral-500 rounded-xl w-full p-1 bg-neutral-900 mt-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordLogin">Mot de passe :</label>
            <input
              className="border-1 border-neutral-500 w-full rounded-2xl p-1 bg-neutral-900 mt-1"
              type="password"
              id="passwordLogin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="border-1 text-blue-500  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
          type="submit"
        >
          Valider
        </button>
        <Link
          className="text-green-700 mt-10 text-sm text-center"
          to={"/register"}
        >
          Pas encore de compte ? <br /> Rendez-vous sur la page de création de
          compte !!
        </Link>
      </form>
    </>
  );
}
