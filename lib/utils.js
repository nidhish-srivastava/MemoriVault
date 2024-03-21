import Resizer from "react-image-file-resizer";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  export function cn(...inputs) {
    return twMerge(clsx(inputs));
  } 
