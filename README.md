# Commentator AI README

A plugin for VSCode designed to add comments to code using Chat GPT. You will need to generate an API key here:

https://platform.openai.com/

Open AI current provides a certain number of free credits.

## Features

- Highlight some code, then right click and you will see a few options such as "Add General Comments" or "Add TS Doc Comments" or "Run Custom GPT Prompt"
- Your code is sent to open ai and then is replaced with the response.
- Note that the only built in prompts are for general comments, TS Doc comments, and R Doc comments.
- You can add your own prompt in the settings to proceed your code.
- Current model used is: gpt-3.5-turbo

## Requirements

- Open AI Api Key

## Extension Settings

The Commentator AI extension provides the following settings for configuration:

### `commentatorAI.formatAfterEdit`

- Type: `boolean`
- Default: `true`
- Description: Format document after applying edit?

  If set to `true`, the document will be formatted automatically after applying the edit. If set to `false`, the document will not be formatted after the edit is applied.

### `commentatorAI.openAIKey`

- Type: `string`
- Default: `""`
- Description: Your OpenAI API Key

  Enter your OpenAI API key to enable the Commentator AI extension to communicate with the OpenAI API for generating comments. You can obtain an API key by signing up for an OpenAI account.

### `commentatorAI.customPrompt`

- Type: `string`
- Default: "Add comments to this code. Return only a string with the updated code. Here is the code:"
- Description: If you want to play around with your own prompt instruction, you can enter it here. The code will be appended to the end of the prompt. It is likely(?) important to ask for only the string containing the updated code back to avoid GPT adding additional commentary.

  Customize the prompt used to request comments from the OpenAI API. The entered text will be used as the prompt, and the code will be appended to the end of the prompt. Make sure to ask for only the string containing the updated code to prevent GPT from adding unintended commentary.


## License: MIT

## Release Notes

Just for fun

### 0.0.1

Initial release of commenator AI

