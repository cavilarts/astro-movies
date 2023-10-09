import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SearchFormProps {
  search?: string;
}

export default function SearchForm({ search = "" }: SearchFormProps) {
  return (
    <form action="/results" className="flex bg-white rounded-full w-full">
      <input
        name="search"
        autoComplete="off"
        placeholder="Enter your prompt and find your next movie"
        className="w-full rounded-full mx-auto text-lg p-4 border-transparent focus:border-transparent focus:ring-0 focus-visible:outline-0 resize-none"
        defaultValue={search}
      />
      <button className="text-emerald-300 font-bold p-2 rounded-full text-xl bg-white flex justify-center align-middle items-center">
        <FontAwesomeIcon className="w-9 p-2" icon={faPaperPlane} />
      </button>
    </form>
  );
}
