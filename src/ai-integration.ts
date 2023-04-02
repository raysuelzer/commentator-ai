import { Configuration, OpenAIApi } from "openai";

export class OpenAIIntegration {

  private configuration: Configuration;

  private openai: OpenAIApi;

  constructor(openAiKey: string) {
    this.configuration = new Configuration({
      apiKey: openAiKey
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async addCommentsChat(code: string, instruction: string): Promise<string> {
    return this.openai.createChatCompletion(
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