export const findIndexSecondOccurrence = (str: string, char: string) => {
  const firstIndex = str.indexOf(char);

  if (firstIndex === -1) {
    return -1;
  }

  return firstIndex === -1 ? firstIndex : str.indexOf(char, firstIndex + 1);
};
