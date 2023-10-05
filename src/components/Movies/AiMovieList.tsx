import { useEffect, useState } from "react";
import type { MovieResult } from "../../types/default";

import Movie from "./Movie";

export interface AiMovieListProps {
  search: string;
  baseUrl: string;
}

export default function AiMovieList({ search, baseUrl }: AiMovieListProps) {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingOptions = new Array(20).fill(0);

  async function getMovies() {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/astro-movies`, {
        method: "POST",
        body: JSON.stringify({ prompt: search }),
      });

      const parsedResponse = await response.json();

      setMovies(parsedResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      getMovies();
    }
  }, [search]);

  return (
    <>
      {loading && <div>Loading...</div>}
      <section className="flex gap-8 max-w-7xl mx-auto flex-wrap justify-start mt-8 pb-8">
        {loading &&
          loadingOptions.map((_x, i) => (
            <article
              key={i}
              className="md:w-[230px] h-[340px] w-full relative rounded-md overflow-hidden border border-white animate-pulse bg-slate-500"
            ></article>
          ))}
        {movies.map((movie: MovieResult) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </section>
    </>
  );
}
