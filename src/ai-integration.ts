import { Configuration, OpenAIApi } from "openai";
import { openAiKey } from "./key.secret";

const configuration = new Configuration({
  apiKey: openAiKey
});

const openai = new OpenAIApi(configuration);

export class OpenAIIntegration {
  async addCommentsChat(code: string, instruction: string): Promise<string> {
    return openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [{
          "role": "user",
          "content": `${instruction}

          ${code}
          `,
        }]
      }
    ).then((response) => {
      return response.data.choices[0]?.message?.content || "";
    });
  }
}