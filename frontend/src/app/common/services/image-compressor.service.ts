import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ImageCompressorService {
  async compress(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.8,
  ): Promise<File> {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    await new Promise<void>((resolve, reject) => {
      img.onload = (): any => resolve();
      img.onerror = (err): any => reject(err);
    });

    let { width, height } = img;
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Canvas not supported");

    ctx.drawImage(img, 0, 0, width, height);

    return new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob)
            throw new Error("Compression failed");
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        "image/jpeg",
        quality,
      );
    });
  }
}
