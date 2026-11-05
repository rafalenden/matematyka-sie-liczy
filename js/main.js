// Show the back-to-top button after scrolling down (smooth scrolling is done in CSS).
const backToTop = document.querySelector('.back-to-top');
addEventListener('scroll', () => backToTop.classList.toggle('back-to-top--visible', scrollY > 300));

// Reveal base64-encoded contact details on click or Enter/Space.
document.querySelectorAll('[data-contact]').forEach((el) => {
  el.setAttribute('role', 'button');
  el.tabIndex = 0;
  const reveal = () => {
    const text = new TextDecoder().decode(Uint8Array.from(atob(el.dataset.value), (c) => c.charCodeAt(0)));
    const link = document.createElement('a');
    link.className = el.className;
    link.href = `${el.dataset.contact}:${el.dataset.contact === 'tel' ? text.replace(/[^\d+]/g, '') : text}`;
    link.textContent = text;
    el.replaceWith(link);
  };
  el.addEventListener('click', reveal);
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });
});

// Keep text on the notebook grid. Text lines are one grid row tall (CSS), but cards,
// tables and notes have arbitrary heights, so pad the header and each content block
// until the next block starts exactly on a grid line.
const row = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row')) || 28;
const header = document.querySelector('.site-header');
const blocks = [...document.querySelectorAll('.container > *')];
const snapToGrid = () => {
  header.style.paddingBottom = '';
  blocks.forEach((el) => { el.style.marginBottom = ''; });
  const pad = parseFloat(getComputedStyle(header).paddingBottom);
  header.style.paddingBottom = `${pad + (row - (header.offsetHeight % row)) % row}px`;
  // walk down the page with exact (fractional, untransformed) heights
  let y = blocks.length ? blocks[0].offsetTop : 0;
  blocks.forEach((el) => {
    const style = getComputedStyle(el);
    const margin = parseFloat(style.marginBottom);
    const end = y + parseFloat(style.height) + margin;
    const extra = (row - (Math.round(end * 100) / 100) % row) % row;
    el.style.marginBottom = `${margin + extra}px`;
    y = end + extra;
  });
};
let frame;
const scheduleSnap = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(snapToGrid); };
new ResizeObserver(scheduleSnap).observe(document.querySelector('.site-header__container'));
blocks.forEach((el) => new ResizeObserver(scheduleSnap).observe(el));
document.fonts.ready.then(scheduleSnap);
