module.exports = (config) => {
  ["css", "images", "js", "admin"].forEach((dir) => config.addPassthroughCopy(dir));

  config.addFilter("base64", (text) => Buffer.from(text || "").toString("base64"));
  config.addFilter("withYear", (text) => (text || "").replaceAll("{rok}", new Date().getFullYear()));

  return { markdownTemplateEngine: false, dir: { input: "src", output: "_site" } };
};
