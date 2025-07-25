import fs from 'fs';
for (let i = 1; i < 27; i++) {
    fetch(
        `https://www.smhi.se/weather-page/weathersymbols/centered/stroke/day/${i}.svg?proxy=wpt-a-cdba7557-ec2c-4a6f-b1a2-3f6bab3b9f8f`,
    )
        .then((response) => response.text())
        .then((svgContent) => {
            fs.writeFileSync(`./public/weather-icons/${i}.svg`, svgContent);
        })
        .catch((error) => console.error('Error downloading SVG:', error));
}
