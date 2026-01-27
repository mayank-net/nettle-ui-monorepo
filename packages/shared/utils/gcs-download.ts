export const gcsUriToHttpsConverter = (gcsUri: string): string => {
  const match = gcsUri.match(/gs:\/\/([^/]+)\/(.+)/);
  if (!match) {
    return "";
  }
  const [, bucketName, filePath] = match;
  const fileUri = `https://${bucketName}.storage.googleapis.com/${filePath}`;
  return fileUri;
};

export const handleDownload = async (gcsUri: string, name: string) => {
  const fileUri = gcsUriToHttpsConverter(gcsUri);

  try {
    // Fetch the file data
    const response = await fetch(fileUri, {
      method: "GET",
      headers: {
        // Add any required headers here
        // For example, if you expect a specific content type:
        // 'Content-Type': 'application/json'
      },
    });

    // Check if the fetch request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the content type from the response headers

    // Get the blob data from the response
    const blob = await response.blob();

    // Create a temporary URL object from the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to trigger the file download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name); // Set the download attribute with the desired file name
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the temporary URL and link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
    // Handle error
  }
};
