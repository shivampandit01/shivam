(() => {
  const hero = document.querySelector('.light-hero');
  const field = hero.querySelector('.light-field');
  const fixture = hero.querySelector('.light-fixture');
  const air = field.getContext('2d');
  const lamp = fixture.getContext('2d');
  if (!air || !lamp) return;

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let motionScale = preference.matches ? .35 : 1;
  preference.addEventListener('change', event => { motionScale = event.matches ? .35 : 1; });
  let visible = true, frame = 0, lastTime = null, time = 0, yaw = 0;
  let width = 0, height = 0, artX = 0, artY = 0, scale = 1;
  let model, showingModel = false, modelInfluence = 0;
  const pointer = {active: false, x: 0, y: 0};
  const brush = {x: 0, y: 0, vx: 0, vy: 0, weight: 0};
  const tau = Math.PI * 2;
  const palette = Array.from({length: 20}, (_, i) => {
    const v = i / 19;
    return 'rgb(' + [64 + 191*v, 39 + 204*v**1.22, 23 + 187*v**1.7].map(Math.round) + ')';
  });

  // One soft optical grain, stamped at different depths and exposures.
  const grain = document.createElement('canvas');
  grain.width = grain.height = 20;
  const ink = grain.getContext('2d');
  const glow = ink.createRadialGradient(10, 10, 0, 10, 10, 10);
  glow.addColorStop(0, '#fff1db');
  glow.addColorStop(.28, 'rgba(250,225,184,.94)');
  glow.addColorStop(.58, 'rgba(226,184,124,.46)');
  glow.addColorStop(1, 'rgba(205,161,106,0)');
  ink.fillStyle = glow;
  ink.fillRect(0, 0, 20, 20);

  // Uniform depth samples for the room, with a second population inside the light.
  function fraction(n) { return n - Math.floor(n); }
  let seed = 173;
  function sample() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const grains = Array.from({length: 2000}, (_, i) => ({
    u: sample(), v: sample(), depth: sample(), phase: tau*sample(),
    inBeam: i % 2 === 0, dx: 0, dy: 0, light: 0
  }));

  function loadModel() {
    const script = document.createElement('script');
    script.src = 'assets/spotlight-points.js';
    script.onload = () => {
      const raw = atob(script.pointCloud);
      const data = new DataView(Uint8Array.from(raw, c => c.charCodeAt(0)).buffer);
      model = new Float32Array(data.byteLength / 7 * 4);
      for (let i = 0, j = 0; i < data.byteLength; i += 7, j += 4) {
        for (let axis = 0; axis < 3; axis++) model[j+axis] = data.getInt16(i+axis*2, true) / 16000;
        model[j+3] = data.getUint8(i+6);
      }
      script.remove();
    };
    script.onerror = () => script.remove();
    document.head.append(script);
  }

  function resize() {
    const bounds = field.getBoundingClientRect(), art = fixture.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio, 2, 2200 / Math.max(1, bounds.width));
    width = bounds.width; height = bounds.height;
    artX = art.left - bounds.left; artY = art.top - bounds.top; scale = art.width / 1000;
    const pw = Math.max(1, Math.round(width*ratio)), ph = Math.max(1, Math.round(height*ratio));
    if (field.width !== pw) field.width = pw;
    if (field.height !== ph) field.height = ph;
    // The fixture and its poster share a 1000 × 800 raster at every breakpoint.
    if (width && height) air.setTransform(pw/width, 0, 0, ph/height, 0, 0);
    render(0);
  }

  function advance(dt) {
    time += dt*motionScale;
    const follow = 1 - Math.exp(-16*dt), drag = 1 - Math.exp(-8*dt);
    let vx = 0, vy = 0;
    if (pointer.active) {
      const dx = (pointer.x-brush.x)*follow, dy = (pointer.y-brush.y)*follow;
      brush.x += dx; brush.y += dy;
      const limit = Math.max(dt, Math.hypot(dx,dy)/680);
      vx = dx/limit; vy = dy/limit;
    }
    brush.vx += (vx-brush.vx)*drag; brush.vy += (vy-brush.vy)*drag;
    brush.weight += ((pointer.active ? 1 : 0)-brush.weight)*drag;
    if (showingModel) {
      modelInfluence += (1-modelInfluence)*drag;
      const aim = (brush.x/width-.5)*brush.weight*.14;
      yaw += ((aim + .055*Math.sin(time*.29))*motionScale - yaw) * (1-Math.exp(-3*dt));
    }
  }

  function paintAir(dt, sourceX, sourceY) {
    const count = Math.min(grains.length, Math.round(560 + width*.94));
    const radius = Math.min(148, width*.27);
    const ease = 1 - Math.exp(-8*dt);
    air.clearRect(0, 0, width, height);
    for (let i = 0; i < count; i++) {
      const g = grains[i];
      const travel = fraction(g.u + time*(g.inBeam ? .029 : .007)*(.65+.55*g.depth));
      let x, y, exposure;
      if (g.inBeam) {
        // Each sheet fans out from the optics and folds once across the opening.
        const envelope = Math.sin(Math.PI*travel);
        const fold = Math.sin(6.5*travel - .16*time + (i%3)*.32);
        x = sourceX - travel*(sourceX + 45);
        y = sourceY + height*(-.44*travel + .32*travel*travel
          + envelope*(.095*fold + (g.v-.5)*(.055+.17*travel)));
        exposure = Math.min(1, travel*19, (1-travel)*12) * (.24 + .43*g.depth);
      } else {
        x = (1-travel)*(width+36)-18;
        y = g.v*height + 6*Math.sin(.21*time+g.phase);
        exposure = .075 + .145*g.depth;
      }
      const dx = x-brush.x, dy = y-brush.y;
      const proximity = Math.max(0, 1-(dx*dx+dy*dy)/(radius*radius))**2 * brush.weight;
      if (dt > 0) {
        // Advection along the gesture, with a soft recovery in its wake.
        g.dx += ((dx*.12-dy*.10 + brush.vx*.038)*proximity*motionScale-g.dx)*ease;
        g.dy += ((dy*.12+dx*.10 + brush.vy*.038)*proximity*motionScale-g.dy)*ease;
        g.light += (proximity-g.light)*ease;
      }
      const size = 1.7 + g.depth*g.depth*2.3 + g.light*1.1;
      air.globalAlpha = Math.min(.87, exposure + .62*g.light);
      air.drawImage(grain, x+g.dx-size/2, y+g.dy-size/2, size, size);
    }
    air.globalAlpha = 1;
  }

  function paintFixture(cos, sin, lensX, lensY) {
    lamp.clearRect(0, 0, 1000, 800);
    lamp.save();
    lamp.translate(lensX, lensY);
    lamp.rotate(-2.68+.23*sin);
    const beam = lamp.createLinearGradient(0, 0, 675, 0);
    beam.addColorStop(0, 'rgba(249,217,167,.043)');
    beam.addColorStop(.48, 'rgba(233,188,124,.018)');
    beam.addColorStop(1, 'rgba(216,176,119,0)');
    lamp.fillStyle = beam;
    for (let band = 1; band <= 12; band++) {
      lamp.beginPath();
      lamp.moveTo(-6, -band*5); lamp.lineTo(675, -band*18);
      lamp.lineTo(675, band*18); lamp.lineTo(-6, band*5); lamp.fill();
    }
    lamp.restore();

    const px = (brush.x-artX)/scale, py = (brush.y-artY)/scale;
    const radius = Math.min(230, 112/scale);
    let last = -1;
    for (let i = 0; i < model.length; i += 4) {
      const x = model[i], y = model[i+1], z = model[i+2], tone = model[i+3];
      const depth = z*cos-x*sin, k = 323/(1-(depth*.98+y*.2)*.085);
      const sx = 580+(x*cos+z*sin)*k, sy = 375-(y*.98-depth*.2)*k;
      const dx = sx-px, dy = sy-py;
      const f = Math.max(0, 1-(dx*dx+dy*dy)/(radius*radius))**2 * brush.weight * modelInfluence;
      const bendX = (dx*.24-dy*.12 + brush.vx*.017/scale)*f*motionScale;
      const bendY = (dy*.24+dx*.12 + brush.vy*.017/scale)*f*motionScale;
      const level = Math.min(19, tone + Math.round(f*2.6));
      if (last !== level) { lamp.fillStyle = palette[level]; last = level; }
      const dot = 1.42+tone*.08;
      lamp.fillRect(sx+bendX, sy+bendY, dot, dot);
    }
  }

  function render(dt) {
    if (!width || !height || !scale) return;
    if (dt > 0) advance(dt);
    const cos = Math.cos(yaw), sin = Math.sin(yaw), depth = .3*(cos+sin);
    const k = 323/(1-(depth*.98+.46*.2)*.085);
    const lensX = 580 + (-.3*cos+.3*sin)*k, lensY = 375-(.46*.98-depth*.2)*k;
    paintAir(dt, artX+scale*lensX, artY+scale*lensY);
    if (model) {
      paintFixture(cos, sin, lensX, lensY);
      if (!showingModel) {
        showingModel = true;
        hero.classList.add('ready');
      }
    }
  }

  function tick(now) {
    frame = 0;
    if (lastTime === null || now-lastTime >= 15) {
      render(lastTime === null ? 0 : Math.min((now-lastTime)/1000, .05));
      lastTime = now;
    }
    schedule();
  }
  function schedule() {
    if (visible && !document.hidden) {
      if (!frame) frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      frame = 0; lastTime = null;
    }
  }
  function leave() {
    pointer.active = false;
  }
  function track(event) {
    if (!event.isPrimary) return;
    if (event.target.closest('a, button')) { leave(); return; }
    const bounds = field.getBoundingClientRect();
    pointer.x = event.clientX-bounds.left; pointer.y = event.clientY-bounds.top;
    if (!pointer.active && brush.weight < .015) {
      brush.x = pointer.x; brush.y = pointer.y;
    }
    pointer.active = true;
  }
  hero.addEventListener('pointermove', track, {passive: true});
  hero.addEventListener('pointerdown', track, {passive: true});
  hero.addEventListener('pointerleave', leave);
  hero.addEventListener('pointercancel', leave);
  hero.addEventListener('pointerup', event => { if (event.pointerType === 'touch') leave(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) leave(); schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) leave();
      schedule();
    }).observe(hero);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    observer.observe(fixture);
  } else window.addEventListener('resize', resize);
  resize();
  loadModel();
  schedule();
})();
