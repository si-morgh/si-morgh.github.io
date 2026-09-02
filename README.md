# si-morgh.github.io

Personal site of Rahman Mohammadpour — mathematics and art.
Built with [Jekyll](https://jekyllrb.com/) on a vendored fork of the
[minima](https://github.com/jekyll/minima) theme, deployed to GitHub Pages
by `.github/workflows/jekyll.yml` on every push to `main`.

## Local development

```sh
bundle install
bundle exec jekyll serve
```

The site is then at <http://localhost:4000>.

## Structure

| Path | Purpose |
| --- | --- |
| `index.md` | Standalone landing page: a drag-gate that leads to the maths or art side. Uses `layout: null`. |
| `Math/` | Mathematics pages (bio, research, notes, slides). Front matter sets `section: math`. |
| `art/` | Art pages: gallery index pages (`layout: gallery_group`) and individual carousels (`layout: gallery`). Front matter sets `section: art`. |
| `_layouts/` | `base` wraps everything; `page`, `post`, `gallery`, `gallery_group`, `home`, `bib` build on it. |
| `_includes/` | `head`, `header`, `footer` and the social-icon SVGs. |
| `_sass/minima/` | Vendored minima partials. **All site-specific styling lives in `custom-styles.scss`**; `custom-variables.scss` overrides minima's SCSS variables before they are used. |
| `_data/` | `navigation.yml` drives both menus. `galleries.yml` lists the images per gallery, `statements.yml` the accompanying text. |
| `assets/` | Images, PDFs (notes and slides), and the compiled stylesheet entry point `css/style.scss`. |
| `_plugins/bibtex.rb` | Local plugin supporting the jekyll-scholar bibliography. |

## Adding a gallery

1. Add the images under `assets/images/art/image-collections/image-<id>/`.
2. Add an `<id>:` key to `_data/galleries.yml` listing each `image:` and `title:`.
3. Optionally add an `<id>:` entry to `_data/statements.yml` — if present, the
   gallery opens on a statement card before the first image.
4. Create `art/<id>.md` with `layout: gallery`, `section: art`, and `gallery_id: <id>`.
5. Reference the new gallery from a `gallery_group` page's `collections:` list,
   or add it to `_data/navigation.yml`.

## Section theming

`_layouts/base.html` copies each page's `section:` front-matter value onto
`<body data-section="...">`. `custom-styles.scss` keys the background colour off
that attribute, so a new section only needs a front-matter value and one CSS rule.

## Licence

The vendored minima theme is MIT licensed (see `LICENSE.txt`). Site content,
text and artwork are © Rahman Mohammadpour.
