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
          content: `please generate a list of 20 movies with relation to: ${body.prompt}. please format your response to be comma separated, without numeration and remove the release date. just the list without other message. sort the result from the more acurrate to the less. do not include any date, please`,
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

    return new Response(JSON.stringify(aimovies.filter((movie) => !!movie)), {
      headers: { "content-type": "application/json; charset=UTF-8" },
      status: 200,
    });
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
