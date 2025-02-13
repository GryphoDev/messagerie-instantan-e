export function Header() {
  const handleClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <header className="border-b-1 border-neutral-500 flex justify-center bg-neutral-900">
      <div className="flex flex-col gap-6 justify-center items-center py-8">
        <h1 className="text-3xl  text-center">Messagerie Instantanée</h1>
        <button
          onClick={handleClick}
          className={
            !localStorage.getItem("token")
              ? "hidden"
              : "border-1 border-neutral-500 py-1 px-4 rounded-xl cursor-pointer"
          }
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
