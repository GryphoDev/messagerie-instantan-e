import { FormEvent, useState, useEffect } from "react";
import { createNewGroup, getAllGroups } from "../services/createGroup";
import { GroupCard } from "../components/groupCard";
import { getUser } from "../services/getUser";

type Group = {
  _id: string;
  admin: { _id: string; username: string }; // Type pour admin avec username
  groupName: string;
  groupTheme: string;
  members: { status: string; username: string; _id: string }[]; // Type pour chaque membre
};

export function Group() {
  const [groupName, setGroupName] = useState<string>("");
  const [groupTheme, setGroupTheme] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>();
  const [currentUser, setCurrentUser] = useState<{
    username: string | undefined;
  }>();

  const handleCreateGroup = async (e: FormEvent) => {
    e.preventDefault();
    setGroupName("");
    setGroupTheme("");
    if (token) {
      await createNewGroup(token, groupName, groupTheme);
      allGroups();
    }
  };

  const user = async () => {
    const response = await getUser(token);
    setCurrentUser(response);
  };

  const allGroups = async () => {
    const response = await getAllGroups(token);
    if (response) setGroups(response.groups);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      allGroups();
      user();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main className="p-3">
      <div className="flex flex-col items-center pt-5 pb-10 gap-8">
        <h2 className="text-2xl text-yellow-600">Créer un groupe</h2>
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
            className="mt-2 border-1 text-blue-500  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
            type="submit"
          >
            Créer le groupe
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-10 text-yellow-600 ">Vos groupes</h2>
        <div className="flex flex-wrap justify-center gap-2 w-11/12">
          {groups?.map((group) => (
            <GroupCard
              key={group._id}
              token={token}
              groupId={group._id}
              currentUser={currentUser?.username}
              admin={group.admin}
              groupName={group.groupName}
              groupTheme={group.groupTheme}
              members={group.members}
            />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-10 text-yellow-600 ">
          Groupes dans lequelles vous apparaissez
        </h2>
        <div className="flex flex-wrap justify-center gap-2 w-11/12">
          {groups?.map((group) => (
            <GroupCard
              key={group._id}
              admin={group.admin}
              groupName={group.groupName}
              groupTheme={group.groupTheme}
              members={group.members}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-10 text-yellow-600 ">Invitation</h2>
        <div className="flex flex-wrap justify-center gap-2 w-11/12">
          {groups?.map((group) => (
            <GroupCard
              key={group._id}
              admin={group.admin}
              groupName={group.groupName}
              groupTheme={group.groupTheme}
              members={group.members}
            />
          ))}
        </div>
      </div> */}
    </main>
  );
}
