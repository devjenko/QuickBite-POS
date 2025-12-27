import { Input } from "../ui/Input";
import { SearchIcon } from "lucide-react";

const InputSearch = ({
  onSearch,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <Input
        className=" rounded-sm bg-[var(--White)]  px-14 py-2.5 "
        placeholder="Search"
        onChange={onSearch}
      />
      <SearchIcon color="grey" className="absolute left-4 top-3" />
    </>
  );
};

export default InputSearch;
