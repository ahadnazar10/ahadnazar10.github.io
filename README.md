# Ahad Nazar — Portfolio

Static site (HTML, CSS, a little JS). No build step. Works on GitHub Pages as-is.

## Edit
- Colors: variables at the top of `css/style.css` (`--orange`, `--lime`, `--bg`, ...).
- Photo: replace `assets/photo.jpg` (portrait, roughly 4:5 works best).
- Project links: in `projects.html`, replace the "View on GitHub" URLs with the exact repo URLs.

## Contact form
GitHub Pages can't receive form posts, so the form opens the visitor's email app.
To receive messages directly instead, create a free form at formspree.io, then in
`index.html` change `<form id="contact-form" ...>` to
`<form action="https://formspree.io/f/YOUR_ID" method="POST" class="contact-form">`
and remove the mailto block in `js/main.js`.
