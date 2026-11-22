const mast = document.querySelector('.mast');
const menu = mast.querySelector('.menu');
const navigation = mast.querySelector('nav');
mast.classList.add('enhanced');
menu.hidden = false;
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close menu' : 'Menu';
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', () => setMenu(false));
mast.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const study = document.querySelector('.case-study');

// Keep the roster's text visible until the supplied artwork has loaded.
for (const logo of document.querySelectorAll('.clients img')) {
  const showLogo = () => logo.parentElement.classList.toggle('has-logo', logo.naturalWidth > 0);
  logo.addEventListener('load', showLogo);
  logo.addEventListener('error', showLogo);
  if (logo.complete) showLogo();
}

// Match each project card to its case-study cover, including history navigation.
const cards = [...document.querySelectorAll('.project-card')];
function matchCover(transition, otherPage) {
  if (!transition || !otherPage || reducedMotion.matches) return;
  const otherPath = new URL(otherPage).pathname;
  const card = cards.find(link => link.pathname === otherPath);
  const cover = card?.querySelector('.card-image') ||
    ((otherPath.endsWith('/') || otherPath.endsWith('/index.html')) && study?.querySelector('.case-cover .tile-image'));
  if (!cover) return;
  cover.style.viewTransitionName = 'project-cover';
  transition.finished.finally(() => cover.style.removeProperty('view-transition-name'));
}
window.addEventListener('pageswap', event => matchCover(event.viewTransition, event.activation?.entry?.url));
window.addEventListener('pagereveal', event => matchCover(event.viewTransition, window.navigation?.activation?.from?.url));

// Keep previously shared homepage project and walkthrough links working.
function restoreProjectLink() {
  const id = location.hash.slice(1);
  if (!id || !cards.length) return;
  const card = cards.find(link => link.id === id);
  if (card) location.replace(card.href);
  else if (id === 'walkthrough' || ['render-icertis-02','render-icertis-03','render-icertis-04'].includes(id)) {
    location.replace(cards[0].href + '#' + id);
  }
}
restoreProjectLink();
window.addEventListener('hashchange', restoreProjectLink);

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('arrive');
      observer.unobserve(entry.target);
    }
  });
  document.querySelectorAll('.backstage-opening h2,.work-heading h2,.archive-entry h2,.case-brief h2').forEach(el => observer.observe(el));
}
