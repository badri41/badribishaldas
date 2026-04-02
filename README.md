# Badri Bishal Das Portfolio

Minimal static portfolio built with plain HTML, CSS, and vanilla JS.

## Folder structure

```text
/
|-- index.html
|-- projects/
|   `-- index.html
|-- blogs/
|   `-- index.html
|-- category/
|   |-- cpp/
|   |   `-- index.html
|   |-- systems/
|   |   `-- index.html
|   `-- misc/
|       `-- index.html
|-- blog/
|   |-- index.html
|   |-- cpp-part1/
|   |   `-- index.html
|   |-- threadSafeQueue/
|   |   `-- index.html
|   |-- OS/
|   |   `-- index.html
|   `-- CNNfromScratch/
|       `-- index.html
|-- contact/
|   `-- index.html
|-- assets/
|   |-- css/
|   |   `-- site.css
|   |-- js/
|   |   `-- site.js
|   `-- images/
|-- favicon.svg
|-- robots.txt
|-- sitemap.xml
`-- .nojekyll
```

## Routing

- `/` → home
- `/projects/` → project list
- `/blogs/` → all posts grouped by category
- `/category/cpp/` → C++ posts
- `/category/systems/` → systems posts
- `/category/misc/` → miscellaneous posts
- `/blog/cpp-part1/` → individual post
- `/blog/threadSafeQueue/` → individual post
- `/blog/OS/` → individual post
- `/blog/CNNfromScratch/` → individual post
- `/contact/` → contact page
- `Resume` in the sidebar and nav links directly to the Google Drive PDF

## Reusable components

Reusable UI is handled with vanilla JS custom elements in `assets/js/site.js`:

- `site-sidebar`
- `mobile-nav`
- `theme-toggle`
- `blog-card`

The same script also generates the table of contents for blog posts from `h2` and `h3` headings.

## Theme

- Default theme is light with linen background `#FAF0E6`
- Dark mode uses `#0f1115`
- Theme choice persists with `localStorage`

## Static hosting

This structure works on GitHub Pages, Netlify, and Vercel because every route is just a folder containing `index.html`.
