function wireDialog(dialog) {
  let opener;
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll: true}));
  return trigger => {
    opener = trigger;
    dialog.showModal();
    dialog.querySelector('.close').focus();
  };
}

function setupGallery(study) {
  const tiles = [...study.querySelectorAll('.tile')];
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  document.body.classList.add('spotlight');
  let pendingSpotlight = 0;
  study.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const frame = event.target.closest('.tile-image');
    if (!frame) return;
    cancelAnimationFrame(pendingSpotlight);
    pendingSpotlight = requestAnimationFrame(() => {
      const rect = frame.getBoundingClientRect();
      frame.style.setProperty('--x', (event.clientX - rect.left) + 'px');
      frame.style.setProperty('--y', (event.clientY - rect.top) + 'px');
    });
  });
  if ('IntersectionObserver' in window && !finePointer.matches) {
    document.body.classList.add('touch-light');
    const light = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('lit', entry.isIntersecting));
    }, {rootMargin: '-15% 0px -15%'});
    tiles.forEach(tile => light.observe(tile));
  }
  const lightbox = document.querySelector('#lightbox');
  const openLightbox = wireDialog(lightbox);
  const largeImage = lightbox.querySelector('.large-image');
  let current = 0;
  function showRender(index) {
    current = (index + tiles.length) % tiles.length;
    const tile = tiles[current];
    largeImage.alt = tile.querySelector('img').alt;
    largeImage.width = Number(tile.dataset.width);
    largeImage.height = Number(tile.dataset.height);
    largeImage.src = tile.href;
    const title = study.querySelector('h1').textContent;
    lightbox.querySelector('#image-caption').textContent = tile.dataset.zone + ' · ' + title;
    lightbox.querySelector('.count').textContent = (current + 1) + ' / ' + tiles.length;
    for (const offset of [-1, 1]) {
      const neighbor = new Image();
      neighbor.src = tiles[(current + offset + tiles.length) % tiles.length].href;
    }
  }
  tiles.forEach(tile => tile.addEventListener('click', event => {
    if (!lightbox.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showRender(tiles.indexOf(tile));
    openLightbox(tile);
  }));
  lightbox.querySelector('.prev').addEventListener('click', () => showRender(current - 1));
  lightbox.querySelector('.next').addEventListener('click', () => showRender(current + 1));
  lightbox.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showRender(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  let swipeStart;
  largeImage.addEventListener('touchstart', event => {
    swipeStart = event.touches.length === 1 ? event.touches[0] : null;
  }, {passive: true});
  largeImage.addEventListener('touchend', event => {
    if (!swipeStart) return;
    const dx = event.changedTouches[0].clientX - swipeStart.clientX;
    const dy = event.changedTouches[0].clientY - swipeStart.clientY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showRender(current + (dx < 0 ? 1 : -1));
    swipeStart = null;
  }, {passive: true});
}

function setupCinema(cinema) {
  const openCinema = wireDialog(cinema);
  const screen = cinema.querySelector('.screen');
  if (cinema.showModal) {
    for (const link of document.querySelectorAll('.film')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = link.className;
      const title = link.querySelector('.film-title').textContent;
      button.setAttribute('aria-label', 'Play ' + title);
      button.append(...link.childNodes);
      link.replaceWith(button);
      button.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.title = title;
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + link.dataset.video + '?autoplay=1';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        cinema.querySelector('#film-caption').textContent = title;
        cinema.querySelector('.watch').href = link.href;
        screen.replaceChildren(iframe);
        openCinema(button);
      });
    }
  }
  cinema.addEventListener('close', () => screen.replaceChildren());
}

if (study) setupGallery(study);
const cinema = document.querySelector('#cinema');
if (cinema) setupCinema(cinema);
