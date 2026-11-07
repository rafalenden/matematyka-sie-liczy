module.exports = (config) => {
  ["css", "images", "js", "admin"].forEach((dir) => config.addPassthroughCopy(dir));

  config.addFilter("base64", (text) => Buffer.from(text || "").toString("base64"));
  config.addFilter("withYear", (text) => (text || "").replaceAll("{rok}", new Date().getFullYear()));

  // **text** in the intro becomes a highlighter stroke
  config.addFilter("highlight", (text) => (text || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>"));
  return { markdownTemplateEngine: false, dir: { input: "src", output: "_site" } };
};
