import { FormEvent, useState } from "react";
import {
  deleteGroup,
  postInvitation,
  fetchInvitation,
} from "../services/createGroup";

type GroupCardProps = {
  token: string;
  groupId: string;
  currentUser?: string;
  admin: { _id: string; username: string }; // Type pour admin avec username
  groupName: string;
  groupTheme: string;
  members: { status: string; username: string; _id: string }[]; // Type pour chaque membre
};

export function GroupCard({
  token,
  groupId,
  currentUser,
  admin,
  groupName,
  groupTheme,
  members,
}: GroupCardProps) {
  const [imputAdd, setInputAdd] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<string>("");

  const handleAcceptInvitation = async () => {
    const response = await fetchInvitation(token, groupId, "accepted");
    if (!response.ok) {
      return alert(response.message);
    }
    alert("Invitation acceptée");
    window.location.reload();
  };

  const handleRefuseInvitation = async () => {
    const response = await fetchInvitation(token, groupId, "rejected");
    if (!response.ok) {
      return alert(response.message);
    }
    alert("Invitation refusée");
    window.location.reload();
  };

  const handleDelete = async () => {
    console.log(groupId);
    const response = await deleteGroup(token, groupId);
    console.log(response);
    if (response) {
      window.location.reload();
    }
  };

  const handleClickAddNewMember = () => {
    if (imputAdd) return setInputAdd(false);
    setInputAdd(true);
  };

  const handleInvitation = async (e: FormEvent) => {
    e.preventDefault();
    const response = await postInvitation(token, groupId, invitation);

    if (!response.ok) {
      return alert(response.message);
    }

    alert(response.message);
    setInputAdd(false);
    window.location.reload();
  };

  return (
    <div className="border-1 border-neutral-500 rounded-xl p-2 w-[280px] h-fit">
      <div className="flex flex-col gap-5 text-xs ">
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col">
            <span>{groupName}</span>
            <span className="bg-yellow-600 w-fit px-2 rounded-sm text-black">
              {groupTheme}
            </span>
          </div>
          <div className="flex gap-2 items-baseline">
            <button
              onClick={() => handleDelete()}
              className={
                admin.username !== currentUser
                  ? "hidden"
                  : "cursor-pointer text-red-600"
              }
            >
              ⛌
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Membres du groupe : </span>
          <ul className="list-disc">
            {members.map((member) => (
              <div className="flex justify-between" key={member.username}>
                <li className="ml-3" key={member._id}>
                  {member.username === currentUser ? "Vous" : member.username}
                </li>
                {member.status === "Admin" && (
                  <span className="text-green-500">Admin</span>
                )}
                {member.status === "pending" &&
                  member.username !== currentUser && <span>En attente</span>}
                {member.status === "pending" &&
                  member.username === currentUser && (
                    <div>
                      <button
                        onClick={handleAcceptInvitation}
                        className="border-1 border-neutral-500 bg-neutral-900 rounded-md px-2 text-blue-500 cursor-pointer"
                      >
                        Accepter
                      </button>{" "}
                      <button
                        onClick={handleRefuseInvitation}
                        className="border-1 border-neutral-500 bg-neutral-900 rounded-md px-2 text-red-500 cursor-pointer"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleClickAddNewMember}
              className="px-1 w-fit cursor-pointer bg-neutral-900 texl-lg rounded-md border-1  border-neutral-500"
            >
              +
            </button>
            <form
              onSubmit={handleInvitation}
              className={imputAdd ? "flex flex-col gap-2" : "hidden"}
            >
              <label className="text-xs" htmlFor="usernameInvit">
                Nom du membre à ajouter :
              </label>
              <div className="flex gap-2">
                <input
                  className="border-1 border-neutral-500 rounded-md "
                  name="usernameInvit"
                  id="usernameInvit"
                  value={invitation}
                  onChange={(e) => setInvitation(e.target.value)}
                  type="text"
                />
                <button
                  type="submit"
                  className="px-2 w-fit cursor-pointer bg-neutral-900 text-blue-500 texl-lg rounded-md border-1  border-neutral-500"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
