export const TS_DOC_COMMENT_INSTRUCTION = `Use the code given to add TSDoc comments. Do not alter the code. Only add comments to the function declaration so that the are properly documented. Do not add additional commenatary. Return your response only as a string containing the code.
Here is the code:`;

export const RUBY_DOC_COMMENT_INSTRUCTION = `Use the ruby code given to add RDoc comments. Do not alter the code. Only add comments to the function declaration so that the are properly documented. Do not add additional commenatary. Return your response only as a string containing the code.
Here is the code:`;

export const GENERAL_COMMENT_INSTRUCTION = `Use the code given to add comments. Do not alter the code. There is no need to comment every line, only the lines that may be more complicated. Do not add additional commenatary. Return your response only as a string containing the code.
Here is the code:`;


export const getInstruction = (type?: string) => {
  switch (type) {
    case 'tsdoc':
      return TS_DOC_COMMENT_INSTRUCTION;
    case 'general':
      return GENERAL_COMMENT_INSTRUCTION;
    case 'ruby':
      return RUBY_DOC_COMMENT_INSTRUCTION;
    default:
      return GENERAL_COMMENT_INSTRUCTION;
  }
};