const axios = require("axios");
const fs = require("fs");
const css = fs.readFileSync("font.css", "utf8");

// Regular expression to match font URLs
const urlRegex = /url\(['"]?(.+?)['"]?\)/gi;

// Array to hold downloaded fonts
const fonts = [];

// Loop over all font URLs in the CSS
let match;
while ((match = urlRegex.exec(css))) {
    const fontUrl = match[1];

    // Download the font file and add it to the fonts array
    axios
        .get(fontUrl, { responseType: "arraybuffer" })
        .then((response) => {
            fonts.push(response.data);

            // Save the downloaded font to a file
            const fontName = `font${fonts.length}.woff2`;
            fs.writeFileSync(fontName, response.data);
            console.log(`Font downloaded and saved as ${fontName}`);
        })
        .catch((error) => {
            console.error(
                `Failed to download font from ${fontUrl}: ${error.message}`
            );
        });
}
