import { Dispatch, FormEvent, SetStateAction } from "react";
import { postNewComment, fetchUpdate } from "../services/fetch";
import {
  postNewGroupMessage,
  fetchUpdateGroupMessage,
} from "../services/createGroup";

interface FormProps {
  setIdUpdatedComment: Dispatch<SetStateAction<string | undefined>>;
  groupSelected: string;
  user: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  idUpdatedComment: string | undefined;
  fetchComments: () => void;
}

export function Form({
  setIdUpdatedComment,
  groupSelected,
  user,
  setMessage,
  message,
  idUpdatedComment,
  fetchComments,
}: FormProps) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (groupSelected === "none") {
      if (idUpdatedComment !== undefined) {
        await fetchUpdate(idUpdatedComment, message);
        setIdUpdatedComment(undefined);
      } else {
        await postNewComment(message, user);
      }
      fetchComments();
    }

    if (groupSelected !== "none") {
      if (idUpdatedComment !== undefined) {
        await fetchUpdateGroupMessage(idUpdatedComment, message);
        setIdUpdatedComment(undefined);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          await postNewGroupMessage(token, groupSelected, message);
        }
      }
      fetchComments();
    }
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
      <div className="flex flex-col gap-3 w-full">
        <div>
          <label htmlFor="comment">🎉 {user}</label>
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
        className="border-1 text-blue-500  border-neutral-500 px-4 bg-neutral-900 py-1 rounded-xl cursor-pointer "
        type="submit"
      >
        Valider
      </button>
    </form>
  );
}
