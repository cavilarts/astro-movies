import type { APIContext } from "astro";
import { OpenAI } from "openai";

export async function POST({ params, request }: APIContext) {
  const body = await request.json();
  const prompt = body.prompt;

  console.log("prompt", prompt);

  if (prompt) {
    const openAI = new OpenAI({
      apiKey: process.env.PUBLIC_AI_API_KEY,
    });

    const chat = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Could you please recommend me a movie with the topic: ${prompt}? in any genre and any language. please just provide a name or a comma separated list of names whitout spaces and quotes.`,
          name: "User",
        },
      ],
    });
    console.log("chat", JSON.stringify(chat.choices));
    const movies = chat.choices
      .map((choice) =>
        choice.message.content?.split(",").map((movie) => {
          const url = import.meta.env.PUBLIC_MOVIE_DB_API_URL;
          return `${url}${
            import.meta.env.PUBLIC_MOVIE_DB_MOVIES_SEARCH_PATH
          }?query=${movie.trim()}&include_adult=false&page=1`;
        })
      )
      .flatMap((movie) => movie)
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

    console.log("moviesResponses", moviesResponses);

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
