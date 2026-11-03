/**
 * Site-wide interactions. Bundled once by Astro; works with View Transitions:
 * page-level things are set up on `astro:page-load` and torn down on `astro:before-swap`.
 * No animation library: CSS does the motion, this file only flips classes once
 * (IntersectionObserver) and drives the light background parallax.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
/** Ambient motion dial, set in global.css (`--ambient`, 0 = off … 1 = full). */
const ambient = () => Math.max(0, Math.min(1, parseFloat(getComputedStyle(root).getPropertyValue('--ambient')) || 0));
if (!reduceMotion) root.classList.add('motion');

let pageAbort: AbortController | null = null;
let observers: IntersectionObserver[] = [];

document.addEventListener('astro:page-load', () => {
  pageAbort = new AbortController();
  const { signal } = pageAbort;
  root.classList.toggle('ambient-off', ambient() === 0);

  initHeader(signal);
  initMenu(signal);
  initReveal();
  initCounters();
  initFilter(signal);
  initForm(signal);
  initSlideshow(signal);
  initFloor(signal);
  if (!reduceMotion) initAmbient(signal);
});

document.addEventListener('astro:before-swap', () => {
  pageAbort?.abort();
  observers.forEach((o) => o.disconnect());
  observers = [];
});

/* ---------- header: solid on scroll, hide on scroll down ---------- */
function initHeader(signal: AbortSignal) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const progress = document.querySelector<HTMLElement>('.progress');
  if (!header) return;
  let lastY = window.scrollY;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (!document.body.classList.contains('menu-open')) {
      if (y > 400 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y <= 400) header.classList.remove('is-hidden');
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true, signal });
}

/* ---------- mobile menu ---------- */
function initMenu(signal: AbortSignal) {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const set = (open: boolean) => {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.toggleAttribute('inert', !open);
  };
  set(false);
  toggle.addEventListener('click', () => set(!document.body.classList.contains('menu-open')), { signal });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false), { signal }));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && set(false), { signal });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && set(false), { signal });
}

/* ---------- scroll-in: reveal, ink wipe, CMYK registration, sheet stack, crop marks — once each ---------- */
function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${(i % 6) * 0.08}s`);
    });
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  document.querySelectorAll('[data-reveal], [data-stack], [data-crop], .eyebrow').forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- number counters: one 400ms step, in time with the sheet drop ---------- */
function initCounters() {
  const fmt = new Intl.NumberFormat('en-IN');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? '';
        const put = (v: number) => (el.textContent = fmt.format(v) + suffix);
        if (reduceMotion) return void put(end);
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 400);
          put(Math.round(end * (1 - (1 - p) ** 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- ambient parallax: machinery textures + photo bands, desktop only ---------- */
function initAmbient(signal: AbortSignal) {
  const els = [...document.querySelectorAll<HTMLElement>('[data-ambient-parallax], .press-band [data-photo-bg], [data-parallax]')];
  const strength = 0.1 * ambient(); // ~10% of scroll
  if (!els.length || !strength || !window.matchMedia('(min-width: 768px)').matches) return;
  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    els.forEach((el) => {
      const box = (el.parentElement ?? el).getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      const offset = (box.top + box.height / 2 - vh / 2) * -strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('resize', onScroll, { passive: true, signal });
}

/* ---------- press floor: hovering a service swaps the preview sheet ---------- */
function initFloor(signal: AbortSignal) {
  const root = document.querySelector<HTMLElement>('[data-floor]');
  if (!root) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-floor-item]')];
  const imgs = [...root.querySelectorAll<HTMLElement>('.floor__stack .media')];
  const slug = root.querySelector<HTMLElement>('[data-floor-slug]');
  const slugs: string[] = JSON.parse(root.querySelector('template[data-floor-slugs]')?.innerHTML || '[]');
  const set = (n: number) => {
    items.forEach((el, k) => el.classList.toggle('is-active', k === n));
    imgs.forEach((el, k) => el.classList.toggle('is-active', k === n));
    if (slug && slugs[n]) slug.textContent = slugs[n];
  };
  items.forEach((el, n) => {
    el.addEventListener('mouseenter', () => set(n), { signal });
    el.addEventListener('focus', () => set(n), { signal });
  });
}

/* ---------- hero photo slideshow ---------- */
function initSlideshow(signal: AbortSignal) {
  const bg = document.querySelector<HTMLElement>('[data-hero-slides] [data-photo-bg]');
  const dotsWrap = document.querySelector<HTMLElement>('[data-slide-dots]');
  const slides = bg ? [...bg.querySelectorAll<HTMLElement>('[data-slide]')] : [];
  if (!dotsWrap || slides.length < 2) return;

  const ms = 6000;
  let i = 0;
  let timer = 0;
  dotsWrap.style.setProperty('--slide-ms', `${ms}ms`);
  dotsWrap.removeAttribute('aria-hidden');
  const go = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    clearTimeout(timer);
    if (!reduceMotion) timer = window.setTimeout(() => go(i + 1), ms);
  };
  const dots = slides.map((_, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show photo ${n + 1}`);
    b.addEventListener('click', () => go(n), { signal });
    dotsWrap.append(b);
    return b;
  });
  go(0);
  signal.addEventListener('abort', () => clearTimeout(timer));
}

/* ---------- product filter ---------- */
function initFilter(signal: AbortSignal) {
  const bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;
  const buttons = bar.querySelectorAll<HTMLButtonElement>('button');
  const items = document.querySelectorAll<HTMLElement>('[data-cat]');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter!;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      items.forEach((it) => {
        const show = cat === 'all' || it.dataset.cat === cat;
        it.hidden = !show;
      });
    }, { signal }),
  );
}

/* ---------- contact form (Web3Forms, falls back to WhatsApp) ---------- */
function initForm(signal: AbortSignal) {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  // Pre-select service from ?service= query
  const pre = new URLSearchParams(location.search).get('service');
  const select = form.querySelector<HTMLSelectElement>('select[name="service"]');
  if (pre && select) [...select.options].forEach((o) => o.value === pre && (o.selected = true));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('botcheck')) return;

    const key = form.dataset.key;
    const show = (state: 'ok' | 'error', msg: string) => {
      status.hidden = false;
      status.dataset.state = state;
      status.textContent = msg;
    };

    if (!key) {
      const lines = [
        `Hi, I'm ${data.get('name')}.`,
        `Service: ${data.get('service')}`,
        data.get('quantity') ? `Quantity: ${data.get('quantity')}` : '',
        `Phone: ${data.get('phone')}`,
        data.get('email') ? `Email: ${data.get('email')}` : '',
        '',
        String(data.get('message') ?? ''),
      ].filter((l) => l !== '');
      window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
      show('ok', 'Opening WhatsApp with your enquiry — just press send!');
      return;
    }

    submit.disabled = true;
    const label = submit.innerHTML;
    submit.textContent = 'Sending…';
    try {
      data.append('access_key', key);
      data.append('subject', `New enquiry: ${data.get('service')} — ${data.get('name')}`);
      data.append('from_name', 'Shree Gayatri Multi Colour Printers website');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      show('ok', "Thank you! We've received your enquiry and will get back to you shortly.");
    } catch {
      show('error', 'Sorry, something went wrong. Please call or WhatsApp us instead.');
    } finally {
      submit.disabled = false;
      submit.innerHTML = label;
    }
  }, { signal });
}
