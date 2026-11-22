function setupTour(plan) {
  const sceneFrame = document.querySelector('.scene-frame');
  const caption = document.querySelector('#scene-caption');
  const planLink = document.querySelector('.plan-link');
  const openPlan = wireDialog(plan);
  const planControls = [...plan.querySelectorAll('[data-scene]')];
  let activeScene = 0;
  let requestedScene = 0;
  let requestNumber = 0;

  const stops = [...document.querySelectorAll('.scene-stop')].map(link => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = link.className;
    button.dataset.src = link.dataset.src;
    button.dataset.alt = link.dataset.alt;
    button.setAttribute('aria-controls', 'venue-scene');
    button.append(...link.childNodes);
    link.replaceWith(button);
    return button;
  });

  function markScene(index) {
    stops.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      button.classList.toggle('passed', i < index);
    });
    planControls.forEach(control => {
      control.setAttribute('aria-pressed', String(Number(control.dataset.scene) === index));
    });
  }

  async function chooseScene(index) {
    if (requestedScene === index) return;
    requestedScene = index;
    const request = ++requestNumber;
    const stop = stops[index];
    const title = stop.textContent.trim();
    if (index === activeScene) {
      caption.textContent = title;
      return;
    }
    const image = new Image();
    image.width = 1672;
    image.height = 941;
    image.alt = stop.dataset.alt;
    image.src = stop.dataset.src;
    try {
      await image.decode();
    } catch {
      if (request === requestNumber) {
        requestedScene = activeScene;
        caption.textContent = title + ' could not load. Select it to retry.';
      }
      return;
    }
    if (request !== requestNumber) return;
    activeScene = index;
    markScene(index);
    caption.textContent = title;
    // During the dissolve, only the incoming image is exposed to assistive technology.
    const previous = sceneFrame.lastElementChild;
    sceneFrame.replaceChildren(previous, image);
    previous.setAttribute('aria-hidden', 'true');
    const clearPrevious = () => previous.remove();
    if (reducedMotion.matches) clearPrevious();
    else {
      image.classList.add('scene-in');
      image.addEventListener('animationend', clearPrevious, {once: true});
      setTimeout(clearPrevious, 720);
    }
  }
  markScene(0);
  stops.forEach((button, index) => button.addEventListener('click', () => chooseScene(index)));
  planLink.addEventListener('click', event => {
    if (!plan.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openPlan(planLink);
  });
  planControls.forEach(control => control.addEventListener('click', () => {
    const index = Number(control.dataset.scene);
    plan.close();
    chooseScene(index);
  }));
}

setupTour(document.querySelector('#venue-plan'));
