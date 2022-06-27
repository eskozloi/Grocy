import { ReactComponent as SearchIco } from "@/assets/icons/search.svg";

interface SearchBarInterface {
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export default function SearchBar({ onInput, onClick }: SearchBarInterface) {
  return (
    <div className="flex justify-center items-center">
      <input className="px-0.75rem pb-0.375rem hide-mob" type="text" placeholder="Search..." onInput={onInput} />
      <SearchIco className="absolute right-0 h-1.5em inline-block cursor-pointer" onClick={onClick} />
    </div>
  );
}
