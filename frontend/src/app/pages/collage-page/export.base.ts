export function getExportHtml(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Collage</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0 solid;
        }

        .container {
          width: 100%;
          padding-block: 2rem;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-inline: 1rem;

          @media (width >= 40rem /* 640px */) {
            max-width: 40rem /* 640px */;
          }
          @media (width >= 48rem /* 768px */) {
            max-width: 48rem /* 768px */;
          }
          @media (width >= 64rem /* 1024px */) {
            max-width: 64rem /* 1024px */;
          }
          @media (width >= 80rem /* 1280px */) {
            max-width: 80rem /* 1280px */;
          }
          @media (width >= 96rem /* 1536px */) {
            max-width: 96rem /* 1536px */;
          }
        }

        .images-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          @media (width >= 48rem /* 768px */) {
            width: calc(3/4 * 100%) /* 75% */;
          }

          @media (width >= 64rem /* 1024px */) {
            width: calc(1/2 * 100%) /* 50% */;
          }
        }

        .image {
          object-fit: cover;
          border-radius: 1.5rem;
        }

        .image[data-size="sm"] {
          width: 50%;
        }

        .image[data-size="md"] {
          width: 75%;
        }

        .image[data-size="lg"] {
          width: 100%;
        }

        .image[data-crop-behavior='crop'] {
          aspect-ratio: 1 / 1;
        }

        .w-full {
          width: 100%;
        }

        .flex {
          display: flex;
        }

        .flex-col {
          flex-direction: column;
        }

        .items-center {
          align-items: center;
        }

        .image-label {
          font-weight: 500;
          font-size: 1.25rem;
          line-height: calc(1.75 / 1.25);
          color: oklch(43.9% 0 0);
          font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="images-wrapper">
          ${content}
        </div>
      </div>
    </body>
    </html>
  `;
}
