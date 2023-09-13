import type { MovieResult } from "../../types/default";

export default function Movie({
  poster_path,
  original_title,
  id,
}: MovieResult) {
  return (
    <a href={`/movie/${id}`} className="w-full md:w-[220px]">
      <article className="md:w-[220px] w-full relative rounded-md">
        <img
          src={`${
            import.meta.env.PUBLIC_MOVIE_DB_IMAGE_BASE_URL
          }/w500${poster_path}`}
          alt={original_title}
          width={220}
          height={300}
          className="object-cover w-full md:w-[220px]"
        />
        <div className="absolute bottom-0 text-white min-h-[100px] bg-gradient-to-t from-black from-40% to-transparent w-full p-4">
          <h2 className="text-center text-lg">{original_title}</h2>
        </div>
      </article>
    </a>
  );
}
