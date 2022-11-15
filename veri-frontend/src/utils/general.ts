export const GetImageSize = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const _URL = window.URL || window.webkitURL;
    const img = new window.Image();
    const objectUrl = _URL.createObjectURL(file);
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = objectUrl;
  });
};
