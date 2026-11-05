// Podgląd strony głównej w Sveltia CMS – odwzorowuje src/_includes/layout.njk.
(() => {
  const { h } = window;

  CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

  const digits = (phone) => String(phone || '').replace(/\D/g, '').replace(/^48(?=\d{9}$)/, '');
  const prettyPhone = (phone) => digits(phone).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');

  const Header = ({ data }) => {
    const contact = data.contact || {};
    return h('header', { className: 'site-header' },
      h('div', { className: 'site-header__container' },
        h('img', { className: 'site-logo', src: '/images/logo.svg', alt: 'Matematyka Się Liczy - Logo' }),
        h('h1', { className: 'site-title' }, data.title),
        h('h2', { className: 'site-subtitle' }, data.intro),
        h('ul', { className: 'contact-list' },
          contact.email && h('li', { className: 'contact-list__item' },
            h('a', { className: 'contact-list__link', href: `mailto:${contact.email}` }, contact.email)),
          contact.phone && h('li', { className: 'contact-list__item' },
            h('a', { className: 'contact-list__link', href: `tel:${digits(contact.phone)}` }, prettyPhone(contact.phone))),
        ),
      ),
    );
  };

  const Testimonials = ({ testimonials }) => {
    const items = (testimonials && testimonials.items) || [];
    const cta = (testimonials && testimonials.cta) || {};
    return h('div', null,
      items.length > 0 && h('h2', null, testimonials.heading),
      items.length > 0 && h('div', { className: 'testimonials-grid' },
        items.map((item, i) => h('div', { className: 'testimonial card', key: i },
          h('blockquote', { className: 'testimonial__quote' }, `"${item.quote || ''}"`),
          h('div', { className: 'testimonial__author' },
            h('strong', { className: 'testimonial__author-name' }, item.author),
            h('em', { className: 'testimonial__author-info' }, item.description),
          ),
        )),
      ),
      cta.url && h('div', { className: 'testimonials-cta' },
        h('h3', { className: 'testimonials-cta__title' }, cta.title),
        h('a', { className: 'button', href: cta.url }, cta.link_text),
      ),
    );
  };

  CMS.registerPreviewTemplate('home', ({ entry, widgetFor }) => {
    const data = entry.get('data').toJS();
    return h('div', null,
      h(Header, { data }),
      h('main', null,
        h('div', { className: 'container' },
          widgetFor('body'),
          h(Testimonials, { testimonials: data.testimonials }),
        ),
      ),
      h('footer', { className: 'site-footer' }, `© ${new Date().getFullYear()} Matematyka Się Liczy`),
    );
  });
})();
