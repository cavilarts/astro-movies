/* empty css                           */import { c as createAstro, b as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, h as renderComponent } from '../astro_f68cc9cc.mjs';
import 'html-escaper';
import 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const $$Astro$1 = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, meta } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-ouamjn2i><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(meta.description, "content")}><meta name="keywords"${addAttribute(meta.keywords, "content")}><meta name="title"${addAttribute(meta.title, "content")}><title>${title}</title>${renderHead()}</head><body data-astro-cid-ouamjn2i>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/Users/carlos/projects/astro-movies/src/layouts/MainLayout.astro", void 0);

function Movie({
  poster_path,
  original_title,
  id
}) {
  return /* @__PURE__ */ jsx("a", { href: `/movie/${id}`, className: "w-full md:w-[220px]", children: /* @__PURE__ */ jsxs("article", { className: "md:w-[220px] w-full", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `${"https://image.tmdb.org/t/p/w500"}${poster_path}`,
        alt: original_title,
        width: 200,
        height: 300,
        className: "object-cover w-full md:w-[200px]"
      }
    ),
    /* @__PURE__ */ jsx("h2", { children: original_title })
  ] }) });
}

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yzc2ZDQ4NWU5MjBkZjg0NjUyMjQ5YWI4NTRmNzlkZCIsInN1YiI6IjYxZGFlMTlkMTIxOTdlMDAxYzY4ZmZlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QsVDfkoN_tN3-WMfctkqGLRngeaMB-thCqSb1fKFl0k"}`
    }
  };
  const url = "https://api.themoviedb.org/3";
  useEffect(() => {
    async function loadMovies() {
      const commposedurl = search ? `${url}${"/search/movie"}?query=${search}&adult=true` : `${url}${"/discover/movie"}?adult=true`;
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
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        name: "search",
        id: "search",
        className: "w-full border border-purple-500 rounded-lg",
        onChange: (event) => setSearch(event.target.value.split(" ").join(",")),
        value: search
      }
    ) }),
    /* @__PURE__ */ jsx("section", { className: "flex gap-8 max-w-7xl mx-auto flex-wrap justify-center", children: movies && movies.map((movie) => /* @__PURE__ */ jsx(
      Movie,
      {
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        adult: movie.adult,
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        video: movie.video,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count
      },
      movie.id
    )) })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Astro Movies";
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$MainLayout, { "title": title, "meta": {
    title,
    description: title,
    keywords: title
  } }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "MovieList", MovieList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/carlos/projects/astro-movies/src/components/Movies/MovieList", "client:component-export": "default" })}` })}`;
}, "/Users/carlos/projects/astro-movies/src/pages/index.astro", void 0);

const $$file = "/Users/carlos/projects/astro-movies/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
