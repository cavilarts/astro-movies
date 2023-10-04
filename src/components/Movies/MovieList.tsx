import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { MovieResult } from "../../types/default";
import Movie from "./Movie.tsx";
import useDebounce from "../../hooks/useDebounce.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500);
  const include_adult = false;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };
  const url = import.meta.env.PUBLIC_MOVIE_DB_API_URL;

  async function searchMovies(query?: string) {
    const commposedurl = `${url}${
      import.meta.env.PUBLIC_MOVIE_DB_MOVIES_SEARCH_PATH
    }?query=${query}&include_adult=${include_adult}&page=1`;
    try {
      const response = await fetch(commposedurl, options);
      const data = await response.json();

      setMovies((movies) => data.results);
      setTotalPages(data.total_pages);
      setCurrentPage((page) => 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMovies() {
    const commposedurl = `${url}${
      import.meta.env.PUBLIC_MOVIE_DB_MOVIES_PATH
    }?include_adult=${include_adult}&page=${currentPage}`;
    try {
      const response = await fetch(commposedurl, options);
      const data = await response.json();

      setMovies((movies) => data.results);
      setTotalPages(data.total_pages);
      setCurrentPage((page) => page + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMoreMovies() {
    const commposedurl = `${url}${
      import.meta.env.PUBLIC_MOVIE_DB_MOVIES_PATH
    }?include_adult=${include_adult}&page=${
      currentPage + 1
    }&query=${debouncedSearch}`;
    try {
      const response = await fetch(commposedurl, options);
      const data = await response.json();

      setMovies((movies) => [...movies, ...data.results]);
      setTotalPages(data.total_pages);
      setCurrentPage((page) => page + 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      searchMovies(debouncedSearch);
    } else {
      loadMovies();
    }
  }, [debouncedSearch]);

  return (
    <section>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-end items-center p-5">
        <div className="border align-middle flex flex-wrap items-center border-white rounded-lg p-2">
          <input
            type="text"
            name="search"
            id="search"
            className=" bg-transparent text-white p-2 text-xl focus-visible:outline-0 focus-visible:outline-transparent"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            placeholder="Search for a movie"
          />
          <span className="text-xl font-bold text-white align-middle justify-end px-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
      </div>
      <section className="flex gap-8 max-w-7xl mx-auto flex-wrap justify-center mt-8 pb-8">
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreMovies}
          hasMore={currentPage < totalPages}
          loader={<FontAwesomeIcon icon="loader" />}
          className="flex gap-8 max-w-7xl mx-auto flex-wrap justify-center mt-8 pb-8"
        >
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
        </InfiniteScroll>
      </section>
    </section>
  );
}
