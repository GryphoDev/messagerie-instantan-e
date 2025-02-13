import { Card } from "../components/card";
import { Form } from "../containers/form";
import { getAllComments } from "../services/fetch";
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

  const fetchComments = async () => {
    if (idUpdatedComment !== undefined) {
      setIdUpdatedComment(undefined);
    }
    const comments = await getAllComments();
    setComments(comments);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col justify-center items-center pb-10 max-w-xl mx-auto">
      <Form
        setMessage={setMessage}
        message={message}
        idUpdatedComment={idUpdatedComment}
        fetchComments={fetchComments}
      />
      <section className="flex flex-col gap-5 w-full items-center">
        {comments?.map((comment) => (
          <Card
            key={comment._id}
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
