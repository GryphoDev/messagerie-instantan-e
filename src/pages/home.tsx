import { Link } from "react-router-dom";
import { Card } from "../components/card";
import { Form } from "../components/formMessage";
import { getAllComments, getGroupComments } from "../services/fetch";
import { getUser } from "../services/getUser";
import { useEffect, useState } from "react";
import { Select } from "../components/select";
import { getAllGroups } from "../services/createGroup";

type Group = {
  _id: string;
  admin: { _id: string; username: string }; // Type pour admin avec username
  groupName: string;
  groupTheme: string;
  members: { status: string; username: string; _id: string }[]; // Type pour chaque membre
};

type Comment = {
  _id: string;
  message: string;
  author: string;
  likers: [string];
};

type CommentGroup = {
  author: { username: string; _id: string }; // Author est un objet avec un username
  createdAt: string;
  groupId: string;
  text: string;
  updatedAt: string;
  _id: string;
};

export function Home() {
  const [idUpdatedComment, setIdUpdatedComment] = useState<string>();
  const [comments, setComments] = useState<Comment[]>();
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>();
  const [groupSelected, setGroupSelected] = useState<string>("none");

  const fetchComments = async () => {
    if (groupSelected === "none") {
      const comments = await getAllComments();
      setComments(comments); // Afficher les commentaires généraux
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await getGroupComments(token, groupSelected);
        const formattedMessages = response.data.map(
          (message: CommentGroup) => ({
            ...message,
            author: message.author?.username || "Utilisateur inconnu", // Extraire username de l'objet author
          })
        );
        setComments(formattedMessages); // Mettre à jour les commentaires avec les messages formatés
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await getAllGroups(token);
        if (response) setGroups(response.groups);
        const data = await getUser(token);
        setUser(data.username);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchComments();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSelected]);

  useEffect(() => {
    fetchComments(); // Rafraîchir les commentaires dès que le groupe sélectionné change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSelected]);

  const filteredGroups = groups?.filter((group) =>
    group.members.some(
      (member) => member.username === user && member.status !== "pending"
    )
  );

  return (
    <main className="flex flex-col justify-center items-center pb-10 max-w-xl mx-auto">
      <Link
        className="border-1 mt-5  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
        to={"/group"}
      >
        Gérer vos groupes 🎸
      </Link>

      <Select
        setGroupSelected={setGroupSelected}
        groupList={filteredGroups ?? []}
      />
      <Form
        setIdUpdatedComment={setIdUpdatedComment}
        groupSelected={groupSelected}
        user={user}
        setMessage={setMessage}
        message={message}
        idUpdatedComment={idUpdatedComment}
        fetchComments={fetchComments}
      />
      <section className="flex flex-col gap-5 items-center w-11/12">
        {comments?.map((comment) => (
          <Card
            key={comment._id}
            groupSelected={groupSelected}
            user={user}
            setMessage={setMessage}
            setIdUpdatedComment={setIdUpdatedComment}
            fetchComments={fetchComments}
            id={comment._id}
            message={comment.message}
            author={comment.author}
          />
        ))}
      </section>
    </main>
  );
}
