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

Content is managed with [Sveltia CMS](https://sveltiacms.app) at `/admin` (`admin/config.yml`).
The whole page is one Markdown file, `src/index.md`. Pricing, testimonials and the button are
custom editor blocks (`admin/blocks.js`): each is edited in one text field (one item per line,
values separated by `|`) and saved into the Markdown as plain HTML, so no build step or preview
code has to understand them.

- **Locally:** run `npm start`, open `http://localhost:8080/admin/` in a Chromium browser and choose
  "Work with Local Repository".
- **Production (Cloudflare Pages):** open `/admin/`, choose "Sign In Using Access Token" and paste a
  fine-grained GitHub token for this repository with *Contents: read and write*. Each save is a commit
  to `main`, which Cloudflare Pages rebuilds automatically. Only token sign-in is enabled
  (`auth_methods: [token]` in `admin/config.yml`).
