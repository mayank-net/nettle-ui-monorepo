export const parseMd = (text: string) => {
  const fixedString = text.replace(/\\n+/g, "\n").replace(/"/g, "");
  return fixedString;
};
