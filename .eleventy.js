const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
    // Add cache busting filter
    eleventyConfig.addFilter("cacheBust", function(url) {
        const [urlPath, urlQuery] = url.split('?');
        const filePath = path.join(__dirname, urlPath.substring(1)); // Remove leading slash

        try {
            const stats = fs.statSync(filePath);
            const timestamp = stats.mtime.getTime();
            return `${urlPath}?v=${timestamp}${urlQuery ? '&' + urlQuery : ''}`;
        } catch (e) {
            console.log('Cache busting error for', url, e);
            return url;
        }
    });

    // Zabezpieczenie danych kontaktowych przed botami: w CMS i repozytorium są zapisane
    // zwykłym tekstem, a na stronie trafiają zakodowane (dekodowane w layout.njk po kliknięciu).
    eleventyConfig.addFilter("base64", (value) => Buffer.from(String(value || ""), "utf8").toString("base64"));
    eleventyConfig.addFilter("phoneEnc", (value) => {
        let digits = String(value || "").replace(/\D/g, "");
        if (digits.length === 11 && digits.startsWith("48")) digits = digits.slice(2); // +48
        const letters = { 7: "q", 1: "w", 4: "e", 5: "r", 0: "t", 9: "y", 2: "u", 8: "i", 6: "o", 3: "p" };
        return digits.split("").map((d) => letters[d]).join("");
    });

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("admin");

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Tekst stopki z CMS; "{rok}" zamieniany jest na bieżący rok.
    eleventyConfig.addFilter("withYear", (text) =>
        String(text || "").replace(/\{rok\}/g, `${new Date().getFullYear()}`));

    // Karta cennika. Kolejne karty są automatycznie grupowane w siatkę (patrz transform niżej).
    // Edytowalna w Sveltia CMS jako komponent "Pozycja cennika".
    eleventyConfig.addShortcode("price", function(title, price, duration, description) {
        return `<div class="pricing-card card" data-grid="pricing-grid">`
            + `<h3 class="pricing-card__title">${title}</h3>`
            + `<div class="pricing-card__price">${price}</div>`
            + `<p class="pricing-card__description">${duration}</p>`
            + `<p class="pricing-card__description">${description}</p>`
            + `<!--/card--></div>`;
    });

    // Dodanie paired shortcode dla sekcji z Larsem
    eleventyConfig.addPairedShortcode("lars", function(content, imageAlt, smallImageSrc, largeImageSrc) {
        return `<div class="lars">
            <div class="lars__image-wrapper">
                <a href="${largeImageSrc}" data-modal-image="${largeImageSrc}" data-modal-alt="${imageAlt}" title="Otwórz większe zdjęcie w oknie popup (kliknij zdjęcie, aby zamknąć)">
                    <img src="${smallImageSrc}" alt="${imageAlt}" class="lars__image" />
                </a>
            </div>
            <div class="lars__content">
                ${content}
            </div>
        </div>`;
    });

    // Owija sąsiadujące karty (cennik) w kontener siatki, dzięki czemu
    // w Markdown nie są potrzebne znaczniki otwierające/zamykające sekcję.
    eleventyConfig.addTransform("cardGrids", function(content) {
        if (!(this.page.outputPath || "").endsWith(".html")) return content;
        return content.replace(
            /(?:<div class="[^"]*" data-grid="([\w-]+)">[\s\S]*?<!--\/card--><\/div>\s*)+/g,
            (run, grid) => `<div class="${grid}">${run.trim()}</div>\n`
        );
    });

    return {
        // Set directories to pass through to the _site folder
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};