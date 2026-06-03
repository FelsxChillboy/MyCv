# Ahmad Azarruddin — Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-6366f1?style=for-the-badge)](https://felsxchillboy.github.io/MyCv/)
[![GitHub Pages](https://img.shields.io/badge/deploy-github%20pages-181717?style=for-the-badge)](https://github.com/FelsxChillboy/MyCv/actions)

Personal portfolio website built with vanilla HTML/CSS/JavaScript. Features dark/light theme, interactive AI chatbot, responsive design, and smooth animations.

## Tech Stack

- HTML5 semantic markup with JSON-LD structured data
- CSS3 custom properties with dark/light theme system
- Vanilla JavaScript (Intersection Observer, typed.js-like effect, chatbot)
- Build: lightningcss + esbuild + html-minifier-terser
- Deploy: GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev     # local dev server on port 3000
npm run build   # production build to dist/
npm run preview # preview production build
```

## Project Structure

```
src/
├── index.html
├── assets/
│   └── profile.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── 404.html
└── favicon.svg
```

## License

MIT
