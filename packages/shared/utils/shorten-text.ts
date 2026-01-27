export const shortenText = (text: string, maxLength: number = 40) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};
