import { useState } from "react";
import Movie from "./Movie";
import type { MovieResult } from "../../types/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export interface AiSearchProps {
  title: string;
  description: string;
}

export default function AiSearch({ title, description }: AiSearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  async function onSearch() {
    setLoading(true);

    try {
      const response = await fetch("/api/v1/astro-movies", {
        method: "POST",
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function onEnter(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && event.shiftKey === false) {
      onSearch();
    }
  }

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuery(event.target.value);
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center max-w-7xl mx-auto p-8">
      <h1 className="text-white font-openSans font-extrabold text-5xl pb-6">
        {title}
      </h1>
      <p className="text-white pb-10">{description}</p>
      <div className="flex bg-white rounded-lg w-full">
        <textarea
          autoComplete="off"
          name="q"
          rows={1}
          onKeyUp={onEnter}
          onChange={onChange}
          placeholder="Enter your prompt and find your next movie"
          className="w-full rounded-full mx-auto text-lg p-4 border-transparent focus:border-transparent focus:ring-0 focus-visible:outline-0 resize-none"
        />
        <button
          className="text-emerald-300 font-bold py-2 px-4 rounded-full text-xl"
          onClick={onSearch}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
      {loading && <p className="text-white">Loading...</p>}
      <section className="flex gap-8 max-w-7xl mx-auto flex-wrap justify-start mt-8 pb-8">
        {movies.map((movie: MovieResult) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </section>
    </section>
  );
}
