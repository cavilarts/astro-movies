import type { APIContext } from "astro";
import { OpenAI } from "openai";

export async function POST({ params, request }: APIContext) {
  const body = await request.json();
  const prompt = body.prompt;

  if (prompt) {
    const openAI = new OpenAI({
      apiKey: process.env.PUBLIC_AI_API_KEY,
    });

    const chat = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `please generate a list of 20 movies with relation to: ${body.prompt}. please format your response to be comma separated, without numeration and remove the release date. just the list without other message. sort the result from the more acurrate to the less please`,
          name: "User",
        },
      ],
    });

    const aimovies = chat.choices
      .map((choice) =>
        choice.message.content?.split(",").map((movie) => movie.trim())
      )
      .flatMap((movie) => movie)
      .filter((movie) => movie);

    const movies = aimovies
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
        Authorization: `Bearer ${import.meta.env.PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
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

    return new Response(
      JSON.stringify(moviesResponses.filter((movie) => !!movie)),
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
        status: 200,
      }
    );
  }

  return new Response(
    JSON.stringify({
      error: "No prompt provided",
    }),
    {
      headers: { "content-type": "application/json; charset=UTF-8" },
    }
  );
}
