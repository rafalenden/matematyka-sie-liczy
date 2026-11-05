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
