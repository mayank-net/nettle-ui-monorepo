export function generateUUID() {
  // Generate a random hexadecimal string
  const hex = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  // Concatenate random hexadecimal strings to form UUID format
  return `${hex()}${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}${hex()}`;
}
