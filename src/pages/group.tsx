import { FormEvent, useState } from "react";
import { createNewGroup } from "../services/createGroup";

export function Group() {
  const [groupName, setGroupName] = useState<string>("");
  const [groupTheme, setGroupTheme] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");

  const handleCreateGroup = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const group = await createNewGroup(token, groupName, groupTheme);
      setNewGroup(group);
      console.log(newGroup);
    }
  };

  return (
    <main className="flex flex-col items-center w-11/12 py-10 gap-8 mx-auto max-w-md min-h-screen ">
      <h2 className="text-2xl text-yellow-600">Gérer vos groupes</h2>
      <form
        onSubmit={handleCreateGroup}
        action="#"
        className="flex flex-col gap-3 items-center"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="groupName">Nom du groupe :</label>
          <input
            className="border-1 border-neutral-500 rounded-xl w-full p-1 bg-neutral-900 mt-1"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            id="groupName"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="groupName">Thème du groupe :</label>
          <input
            className="border-1 border-neutral-500 rounded-xl w-full p-1 bg-neutral-900 mt-1"
            name="groupName"
            value={groupTheme}
            onChange={(e) => setGroupTheme(e.target.value)}
            id="groupName"
            type="text"
          />
        </div>
        <button
          className="border-1 text-blue-500  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
          type="submit"
        >
          Créer le groupe
        </button>
      </form>
      <h2 className="text-2xl mb-10 text-yellow-600">Vos groupes</h2>
    </main>
  );
}
