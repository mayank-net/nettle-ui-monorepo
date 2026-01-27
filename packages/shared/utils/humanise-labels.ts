export function humaniseLabels(label: string): string {
  // Replace special characters with spaces using regex
  const stringWithSpaces = label.replace(/[^\w\s]|_/gi, " ");

  // Convert string to title case
  const titleCaseString = stringWithSpaces
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return titleCaseString;
}
