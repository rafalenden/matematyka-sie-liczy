// Sveltia CMS editor components. The block is stored in Markdown as a single
// Eleventy shortcode line, e.g. {% price "Liceum", "110 zł", "60 minut", "Klasy I–III" %}

// Liquid strings cannot contain the delimiting quote, so encode it as an HTML entity.
const q = (value) => `"${String(value ?? '').replace(/"/g, '&quot;')}"`;
const unq = (value) => String(value ?? '').replace(/&quot;/g, '"');
const esc = (value) => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const arg = '"([^"]*)"';
const shortcode = (name, count) =>
  new RegExp(`^\\{% ${name} ${Array(count).fill(arg).join(',\\s*')} %\\}$`, 'm');

CMS.registerPreviewStyle('/css/styles.css');

CMS.registerEditorComponent({
  id: 'price',
  label: 'Pozycja cennika',
  icon: 'payments',
  fields: [
    { name: 'title', label: 'Nazwa', widget: 'string' },
    { name: 'price', label: 'Cena', widget: 'string' },
    { name: 'duration', label: 'Czas trwania', widget: 'string' },
    { name: 'description', label: 'Opis', widget: 'string', required: false },
  ],
  pattern: shortcode('price', 4),
  fromBlock: (m) => ({ title: unq(m[1]), price: unq(m[2]), duration: unq(m[3]), description: unq(m[4]) }),
  toBlock: (d) => `{% price ${[d.title, d.price, d.duration, d.description].map(q).join(', ')} %}`,
  toPreview: (d) => `<div class="pricing-card card">
    <h3 class="pricing-card__title">${esc(d.title)}</h3>
    <div class="pricing-card__price">${esc(d.price)}</div>
    <p class="pricing-card__description">${esc(d.duration)}</p>
    <p class="pricing-card__description">${esc(d.description)}</p></div>`,
});
