import { fetchDelete } from "../services/fetch";

type CardProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIdUpdatedComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  fetchComments: () => void;
  id: string;
  message: string;
  author: string;
};

export function Card({
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
    <div className="flex flex-col gap-4 w-11/12 border-1 border-neutral-500 shadow-white bg-neutral-900 rounded-2xl p-2 ">
      <div className="flex justify-between items-center">
        <span className="text-xs">De : {author}</span>
        <div className="flex gap-2">
          <button onClick={() => handleUpdate(id)} className="cursor-pointer">
            ✎
          </button>
          <button onClick={() => handleDelete(id)} className="cursor-pointer">
            ⛌
          </button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}
