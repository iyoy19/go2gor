import fs from "fs";
import sharp from "sharp";

// Convert logo.jpg to favicon.ico (multi-size)
(async () => {
  await sharp("public/logo.jpg").resize(48, 48).toFile("public/favicon.ico");
})();
