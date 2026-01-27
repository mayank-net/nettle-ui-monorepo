export const humaniseUrl = (url: string): string => {
  let formattedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  formattedUrl = formattedUrl.split("/")[0];
  // formattedUrl = formattedUrl.split(".")[formattedUrl.split(".").length - 2];
  return formattedUrl;
};
