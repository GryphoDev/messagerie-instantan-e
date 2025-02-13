import { fetchDelete } from "../services/fetch";

type CardProps = {
  user: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIdUpdatedComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  fetchComments: () => void;
  id: string;
  message: string;
  author: string;
};

export function Card({
  user,
  setMessage,
  setIdUpdatedComment,
  fetchComments,
  id,
  message,
  author,
}: CardProps) {
  const handleDelete = async (id: string) => {
    await fetchDelete(id);
    fetchComments();
  };

  const handleUpdate = (id: string) => {
    setMessage(message);
    setIdUpdatedComment(id);
  };

  return (
    <div
      className={`flex flex-col w-10/12 border-1 border-neutral-500 shadow-white bg-neutral-900 rounded-2xl p-2  ${
        user === author ? "self-end " : "self-start"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs text-green-700">De : {author}</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdate(id)}
            className={
              user === author
                ? "cursor-pointer text-yellow-600 text-xl "
                : "hidden"
            }
          >
            ✎
          </button>
          <button
            onClick={() => handleDelete(id)}
            className={
              user === author ? "cursor-pointer text-red-600" : "hidden"
            }
          >
            ⛌
          </button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}
