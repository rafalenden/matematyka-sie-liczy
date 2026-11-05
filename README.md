# Matematyka Się Liczy

A modern website for a math tutor, built with Eleventy (11ty).

## 🛠️ Technologies

- [Eleventy](https://www.11ty.dev/) - static site generator
- HTML5 & CSS3
- JavaScript

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone git@github.com:rafenden/matematyka-sie-liczy.git
cd matematyka-sie-liczy
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm start
```

The site will be available at `http://localhost:8080`

## 🏗️ Build

To build for production:
```bash
npm run build
```

## ✏️ Content editing (Sveltia CMS)

Content is managed with [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin`
(config: `admin/config.yml`). Everything is edited on one CMS page, which is `src/index.md`. The body is plain Markdown. Pricing
cards are shortcode blocks inserted from the editor (defined in `admin/editor-components.js`), and
adjacent cards are wrapped in a grid automatically. Testimonials and the button below them are a
list in the front matter (`testimonials`), rendered by the layout.

- **Locally:** run `npm start`, open `http://localhost:8080/admin/` in a Chromium browser and choose
  "Work with Local Repository".
- **Production (Cloudflare Pages):** open `/admin/`, choose "Sign In Using Access Token" and paste a
  fine-grained GitHub token for this repository with *Contents: read and write*. Each save is a commit
  to `main`, which Cloudflare Pages rebuilds automatically. Only token sign-in is enabled
  (`auth_methods: [token]` in `admin/config.yml`).
