import { useEffect, useState } from "react";
import type { MovieResult } from "../../types/default";
import { OpenAI } from "openai";

import Movie from "./Movie";

export interface AiMovieListProps {
  search: string;
  baseUrl: string;
}

export default function AiMovieList({ search, baseUrl }: AiMovieListProps) {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingOptions = new Array(20).fill(0);

  async function getMovieNames() {
    setLoading(true);
    try {
      const openAI = new OpenAI({
        apiKey: import.meta.env.PUBLIC_AI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const chat = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `please generate a list of 20 movies with relation to: ${search}. please format your response to be comma separated, without numeration and remove the release date. just the list without other message. sort the result from the more acurrate to the less. do not include any date, please`,
            name: "User",
          },
        ],
      });

      const aimovies = chat.choices
        .map((choice: any) =>
          choice.message.content
            ?.split(",")
            .map((movie: string) => movie.trim())
        )
        .flatMap((movie) => movie)
        .filter((movie) => movie);

      getMovies(aimovies);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMovies(movieNames: string[]) {
    try {
      const movies = movieNames
        .map((choice) => {
          const url = import.meta.env.PUBLIC_MOVIE_DB_API_URL;
          return `${url}${
            import.meta.env.PUBLIC_MOVIE_DB_MOVIES_SEARCH_PATH
          }?query=${choice}&include_adult=false&page=1`;
        })
        .filter((movie) => movie);

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.PUBLIC_MOVIE_DB_ACCESS_TOKEN
          }`,
        },
      };
      const moviesResponses = await Promise.all(
        movies.map(
          (movie) =>
            movie &&
            fetch(movie, options).then((res) =>
              res.json().then((json) => json.results[0])
            )
        )
      );

      console.log(moviesResponses);
      setMovies(moviesResponses.filter((movie) => movie));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      getMovieNames();
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
