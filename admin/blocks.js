// Custom Markdown blocks for the CMS editor. Each block is edited with normal form fields
// and saved into the Markdown as plain HTML, so the site and the preview render it as-is.
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const parse = (html) => new DOMParser().parseFromString(html, 'text/html');
const text = (el, selector) => el.querySelector(selector)?.textContent.trim() ?? '';
const items = (value) => (Array.isArray(value) ? value : []);

// Registers a block whose preview is the same HTML it saves.
const register = (component) => CMS.registerEditorComponent({ ...component, toPreview: component.toBlock });

register({
  id: 'pricing',
  label: 'Cennik',
  icon: 'payments',
  fields: [{
    name: 'items', label: 'Pozycje', label_singular: 'pozycję', widget: 'list',
    collapsed: true, // each item starts collapsed, showing only the summary line
    summary: '{{fields.title}} – {{fields.price}}',
    fields: [
      { name: 'title', label: 'Nazwa', widget: 'string' },
      { name: 'price', label: 'Cena', widget: 'string' },
      { name: 'duration', label: 'Czas trwania', widget: 'string', required: false },
      { name: 'description', label: 'Opis', widget: 'string', required: false },
    ],
  }],
  pattern: /^<div class="pricing-grid">\n[\s\S]*?\n<\/div>$/m,
  fromBlock: (match) => ({
    items: [...parse(match[0]).querySelectorAll('.pricing-card')].map((card) => {
      const [duration, description] = [...card.querySelectorAll('.pricing-card__description')].map((p) => p.textContent.trim());
      return { title: text(card, '.pricing-card__title'), price: text(card, '.pricing-card__price'), duration, description };
    }),
  }),
  toBlock: (data) => `<div class="pricing-grid">\n${items(data.items).map((i) =>
    `<div class="pricing-card card"><h3 class="pricing-card__title">${esc(i.title)}</h3>`
    + `<div class="pricing-card__price">${esc(i.price)}</div>`
    + `<p class="pricing-card__description">${esc(i.duration)}</p>`
    + `<p class="pricing-card__description">${esc(i.description)}</p></div>`).join('\n')}\n</div>`,
});

register({
  id: 'testimonials',
  label: 'Opinie',
  icon: 'format_quote',
  fields: [{
    name: 'items', label: 'Opinie', label_singular: 'opinię', widget: 'list',
    collapsed: true, // each testimonial starts collapsed, showing only the summary line
    summary: '{{fields.author}} – {{fields.description}}',
    fields: [
      { name: 'author', label: 'Autor', widget: 'string' },
      { name: 'description', label: 'Opis autora', widget: 'string', required: false },
      { name: 'quote', label: 'Treść', widget: 'text' },
    ],
  }],
  pattern: /^<div class="testimonials-grid">\n[\s\S]*?\n<\/div>$/m,
  fromBlock: (match) => ({
    items: [...parse(match[0]).querySelectorAll('.testimonial')].map((card) => ({
      author: text(card, '.testimonial__author-name'),
      description: text(card, '.testimonial__author-info'),
      quote: text(card, '.testimonial__quote').replace(/^"|"$/g, ''),
    })),
  }),
  toBlock: (data) => `<div class="testimonials-grid">\n${items(data.items).map((i) =>
    `<div class="testimonial card"><blockquote class="testimonial__quote">"${esc(String(i.quote ?? '').replace(/\s*\n\s*/g, ' '))}"</blockquote>`
    + `<div class="testimonial__author"><strong class="testimonial__author-name">${esc(i.author)}</strong>`
    + `<em class="testimonial__author-info">${esc(i.description)}</em></div></div>`).join('\n')}\n</div>`,
});

register({
  id: 'button',
  label: 'Przycisk',
  icon: 'smart_button',
  fields: [
    { name: 'title', label: 'Nagłówek', widget: 'string', required: false },
    { name: 'label', label: 'Tekst przycisku', widget: 'string' },
    { name: 'url', label: 'Link', widget: 'string' },
  ],
  pattern: /^<div class="testimonials-cta">.*<\/div>$/m,
  fromBlock: (match) => {
    const doc = parse(match[0]);
    return { title: text(doc, '.testimonials-cta__title'), label: text(doc, '.button'), url: doc.querySelector('.button')?.getAttribute('href') ?? '' };
  },
  toBlock: (data) => `<div class="testimonials-cta"><h3 class="testimonials-cta__title">${esc(data.title)}</h3>`
    + `<a href="${attr(data.url)}" class="button">${esc(data.label)}</a></div>`,
});
