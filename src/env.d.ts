/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MOVIE_DB_API_KEY: string;
  readonly PUBLIC_MOVIE_DB_ACCESS_TOKEN: string;
  readonly MOVIE_DB_API_URL: string;
  readonly MOVIE_DB_IMAGE_BASE_URL: string;
  readonly MOVIE_DB_MOVIES_PATH: string;
  readonly PUBLIC_MOVIE_DB_MOVIES_SEARCH_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
