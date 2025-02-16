import { useState } from "react";

type Group = {
  _id: string;
  admin: { _id: string; username: string }; // Type pour admin avec username
  groupName: string;
  groupTheme: string;
  members: { status: string; username: string; _id: string }[]; // Type pour chaque membre
};
type SelectProps = {
  setGroupSelected: (groupId: string) => void;
  groupList?: Group[]; // `?` pour gérer les valeurs undefined
};

export function Select({ groupList = [], setGroupSelected }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>("none");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue); // Met à jour l'état local
    setGroupSelected(newValue); // Met à jour l'état parent
  };

  return (
    <select
      onChange={handleChange}
      value={selectedValue}
      className="border-1 mt-5 px-2  border-neutral-500 bg-neutral-900 py-1 rounded-xl"
      name="groupList"
      id="groupList"
    >
      <option value="none">Choisissez un groupe</option>
      {groupList.map((group) => (
        <option key={group.groupName} value={group._id}>
          {group.groupName}
        </option>
      ))}
    </select>
  );
}
