/**Returns the given string with the first letter capitalized */
export const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.substring(1)}`;
