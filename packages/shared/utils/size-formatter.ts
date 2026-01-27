export const formatFileSize = (sizeInBytes: number): string => {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  try {
    if (sizeInBytes >= GB) {
      return (sizeInBytes / GB).toFixed(2) + " GB";
    } else if (sizeInBytes >= MB) {
      return (sizeInBytes / MB).toFixed(2) + " MB";
    } else if (sizeInBytes >= KB) {
      return (sizeInBytes / KB).toFixed(2) + " KB";
    } else {
      return sizeInBytes + " bytes";
    }
  } catch (err) {
    return sizeInBytes.toString();
  }
};
