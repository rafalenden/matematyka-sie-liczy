// CMS preview of the home page; mirrors src/_includes/layout.njk.
CMS.registerPreviewStyle('/css/styles.css');
CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

CMS.registerPreviewTemplate('home', ({ entry, widgetFor }) => {
  const { h } = window;
  const d = entry.get('data').toJS();
  const contact = d.contact || {};
  return h('div', null,
    h('header', { className: 'site-header' },
      h('div', { className: 'site-header__container' },
        h('img', { className: 'site-logo', src: '/images/logo.svg', alt: '' }),
        h('h1', { className: 'site-title' }, d.title),
        h('h2', { className: 'site-subtitle' }, d.intro),
        h('ul', { className: 'contact-list' },
          [contact.email, contact.phone].filter(Boolean).map((value) =>
            h('li', { className: 'contact-list__item', key: value }, h('span', { className: 'contact-list__link' }, value))),
        ),
      ),
    ),
    h('main', null, h('div', { className: 'container' }, widgetFor('body'))),
    d.footer && h('footer', { className: 'site-footer' }, String(d.footer).replaceAll('{rok}', new Date().getFullYear())),
  );
});
