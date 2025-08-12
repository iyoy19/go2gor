import sharp from "sharp";

(async () => {
  await sharp("public/logo.jpg")
    .resize(512, 512)
    .png()
    .removeAlpha() // Remove any existing alpha first
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Ensure white is background
    .toBuffer()
    .then(async (buffer) => {
      // Remove white background by making it transparent
      await sharp(buffer)
        .png()
        .threshold(254) // Make almost white pixels transparent
        .toFile("public/logo-transparent.png");
    });
})();
