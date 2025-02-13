import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRegister } from "../services/authentification";

export function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerif, setPasswordVerif] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordVerif) {
      return alert("Les mots de passe ne sont pas identique");
    }
    const response = await fetchRegister(username, password);
    const token = response.token;
    if (token) {
      localStorage.setItem("token", token);
      alert("Inscription réussie !");
      window.location.href = "/home";
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-11/12 py-10 gap-8 mx-auto max-w-md min-h-screen -mt-[80px]"
        action="#"
      >
        <h2 className="text-2xl text-yellow-600 mb-10">Créer un compte</h2>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <label htmlFor="userNameRegister">Nom d'utilisateur</label>
            <input
              id="userNameRegister"
              className="border-1 border-neutral-500 rounded-xl w-full p-1 bg-neutral-900 mt-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input
              className="border-1 border-neutral-500 w-full rounded-2xl p-1 bg-neutral-900 mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordVerif">Vérification mot de passe :</label>
            <input
              className="border-1 border-neutral-500 w-full rounded-2xl p-1 bg-neutral-900 mt-1"
              type="password"
              value={passwordVerif}
              onChange={(e) => setPasswordVerif(e.target.value)}
              id="passwordVerif"
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
        <Link className="text-center text-sm mt-10 text-green-700" to={"/"}>
          Vous avez déjà un compte ? <br /> Rendez-vous sur la page de
          connextion !!
        </Link>
      </form>
    </>
  );
}
