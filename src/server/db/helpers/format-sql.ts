/**
 * Gets the shortest leading whitespace from lines in a string
 */
const minIndent = (str: string) => {
  const match = str.match(/^[\t ]*(?=\S)/gm);

  if (!match) return 0;

  return match.reduce((r, a) => Math.min(r, a.length), Number.POSITIVE_INFINITY);
};

/**
 * Strips leading whitespace from each line in a string
 */
const stripIndent = (str: string) => {
  const indent = minIndent(str);

  if (indent === 0) return str;

  const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');

  return str.replace(regex, '');
};

/**
 * Formats multiline SQL strings.
 */
export const formatSql = (str: string) => stripIndent(str);
