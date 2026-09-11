// Reveal-on-scroll: tags <html> so the hidden initial state only applies when
// JS is available (content stays visible without JS), then adds .is-visible
// via IntersectionObserver. Reduced-motion is handled in CSS.
document.documentElement.classList.add('js');

const els = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add('is-visible'));
}
