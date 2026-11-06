// CMS preview of the home page; mirrors src/_includes/layout.njk.
CMS.registerPreviewStyle('/css/styles.css');
CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Caveat:wght@500..700&family=Raleway:ital,wght@0,400..800;1,400..800&display=swap');

CMS.registerPreviewTemplate('home', ({ entry, widgetFor }) => {
  const { h } = window;
  const d = entry.get('data').toJS();
  const contact = d.contact || {};
  const title = String(d.title || '').split(' ');
  return h('div', null,
    h('header', { className: 'site-header' },
      h('div', { className: 'hero-symbols', 'aria-hidden': true }, ['∑', 'π', '√', '∞', '÷', 'x²', '∫', '='].map((c) => h('span', { key: c }, c))),
      h('div', { className: 'site-header__container' },
        h('picture', null,
          h('source', { media: '(prefers-color-scheme: dark)', srcSet: '/images/logo-candy-dark.svg' }),
          h('img', { className: 'site-logo', src: '/images/logo-candy.svg', alt: '' })),
        h('h1', { className: 'site-title' }, title.slice(0, -1).join(' '), ' ', h('mark', null, title.at(-1))),
        h('h2', { className: 'site-subtitle' }, d.subtitle),
        h('ul', { className: 'contact-list' },
          [contact.email, contact.phone].filter(Boolean).map((value) =>
            h('li', { className: 'contact-list__item', key: value }, h('span', { className: 'contact-list__link' }, value))),
        ),
      ),
    ),
    h('main', null, h('div', { className: 'container' }, d.intro && h('p', { className: 'lead' }, d.intro), widgetFor('body'))),
    d.footer && h('footer', { className: 'site-footer' }, String(d.footer).replaceAll('{rok}', new Date().getFullYear())),
  );
});
