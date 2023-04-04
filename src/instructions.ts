
import * as vscode from 'vscode';


export const TS_DOC_COMMENT_INSTRUCTION = `Use the code given to add TSDoc comments.
Do not alter the code.
Only add comments to the function declaration so that they are properly documented in TS Doc Format.
Do not add additional comments or explanations outside of TSDoc Comments.
Your response should only contain the code.
Here is the code:`;

export const RUBY_DOC_COMMENT_INSTRUCTION = `Use the ruby code given to add RDoc comments.
Do not alter the code.
Only add comments to the function declaration so that they are properly documented in RDoc Format.
Do not add additional comments or explanations outside of RDoc Comments.
Your response should only contain the code.
Here is the code:`;

export const GENERAL_COMMENT_INSTRUCTION = `I would like you to add comments to the following block of code in the appropriate commenting style for the language detected. For example if you detect that language is typescript, include TSDoc comments, if you detect the language is ruby use RDoc, etc. Please do not modify the code's functionality or return any output other than the code with comments added. Also, do not format the output in a way that the raw response cannot be directly injected into a code editor. You do not need to comment each line, only those which are most important. Inline comments should not be made on the same line as the code, but directly before the code.
Code:
`;


export const getInstruction = (type?: string) => {
  switch (type) {
    case 'tsdoc':
      return TS_DOC_COMMENT_INSTRUCTION;
    case 'general':
      return GENERAL_COMMENT_INSTRUCTION;
    case 'rdoc':
      return RUBY_DOC_COMMENT_INSTRUCTION;
    case 'custom':
      const config = vscode.workspace.getConfiguration('commentatorAI');
      const customPrompt = config.get<string>('customPrompt', GENERAL_COMMENT_INSTRUCTION);
      return customPrompt;
    default:
      return GENERAL_COMMENT_INSTRUCTION;
  }
};