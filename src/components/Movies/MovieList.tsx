import { useEffect, useState } from "react";

import type { MovieResult } from "../../types/default";
import Movie from "./Movie.tsx";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [search, setSearch] = useState<string>("");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };
  const url = import.meta.env.PUBLIC_MOVIE_DB_API_URL;

  useEffect(() => {
    async function loadMovies() {
      const commposedurl = search
        ? `${url}${
            import.meta.env.PUBLIC_MOVIE_DB_MOVIES_SEARCH_PATH
          }?query=${search}&adult=true`
        : `${url}${import.meta.env.PUBLIC_MOVIE_DB_MOVIES_PATH}?adult=true`;
      try {
        const response = await fetch(commposedurl, options);
        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    loadMovies();
  }, [search]);

  return (
    <section>
      <div className="p-5">
        <input
          type="text"
          name="search"
          id="search"
          className="w-full border border-purple-500 rounded-lg"
          onChange={(event) =>
            setSearch(event.target.value.split(" ").join(","))
          }
          value={search}
        />
      </div>
      <section className="flex gap-8 max-w-7xl mx-auto flex-wrap justify-center">
        {movies &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              backdrop_path={movie.backdrop_path}
              genre_ids={movie.genre_ids}
              adult={movie.adult}
              id={movie.id}
              original_language={movie.original_language}
              original_title={movie.original_title}
              overview={movie.overview}
              popularity={movie.popularity}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              title={movie.title}
              video={movie.video}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
          ))}
      </section>
    </section>
  );
}
