import type { MovieResult } from "../../types/default";

export default function Movie({
  poster_path,
  original_title,
  id,
}: MovieResult) {
  return (
    <a href={`/movie/${id}`} className="w-full md:w-[220px]">
      <article className="md:w-[220px] w-full">
        <img
          src={`${
            import.meta.env.PUBLIC_MOVIE_DB_IMAGE_BASE_URL
          }${poster_path}`}
          alt={original_title}
          width={200}
          height={300}
          className="object-cover w-full md:w-[200px]"
        />
        <h2>{original_title}</h2>
      </article>
    </a>
  );
}
