import { FormEvent, useState } from "react";
import { postNewComment, fetchUpdate } from "../services/fetch";

interface FormProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  idUpdatedComment: string | undefined;
  fetchComments: () => void;
}

export function Form({
  setMessage,
  message,
  idUpdatedComment,
  fetchComments,
}: FormProps) {
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthor("");
    setMessage("");

    if (idUpdatedComment !== undefined) {
      await fetchUpdate(idUpdatedComment, message);
      fetchComments();
      return;
    }

    await postNewComment(message, author);
    fetchComments();
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form
      className="flex flex-col items-center w-11/12 pb-10 pt-20 gap-3 "
      onSubmit={handleSubmit}
      action="#"
    >
      <h2 className="text-xl mb-5">Envoyer un message</h2>
      <div className="flex flex-col gap-3 w-full">
        <div className={idUpdatedComment ? "hidden" : ""}>
          <label htmlFor="name">Nom :</label>
          <input
            id="name"
            className="border-1 border-neutral-500 rounded-xl w-full p-1 bg-neutral-900 mt-1"
            value={author}
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Message :</label>
          <textarea
            className="border-1 border-neutral-500 w-full rounded-2xl p-1 bg-neutral-900 mt-1 h-28"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeydown}
            id="comment"
            name="comment"
            required
          />
        </div>
      </div>
      <button
        className="border-1  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
        type="submit"
      >
        Valider
      </button>
    </form>
  );
}
