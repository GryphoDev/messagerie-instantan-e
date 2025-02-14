import { Link } from "react-router-dom";
import { Card } from "../components/card";
import { Form } from "../components/formMessage";
import { getAllComments } from "../services/fetch";
import { getUser } from "../services/getUser";
import { useEffect, useState } from "react";

type Comment = {
  _id: string;
  message: string;
  author: string;
  likers: [string];
};

export function Home() {
  const [idUpdatedComment, setIdUpdatedComment] = useState<string>();
  const [comments, setComments] = useState<Comment[]>();
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const fetchComments = async () => {
    if (idUpdatedComment !== undefined) {
      setIdUpdatedComment(undefined);
    }
    const comments = await getAllComments();
    setComments(comments);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
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
  }, []);

  return (
    <main className="flex flex-col justify-center items-center pb-10 max-w-xl mx-auto">
      <Link
        className="border-1 mt-5  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
        to={"/group"}
      >
        Gérer vos groupes 🎸
      </Link>
      <Form
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
