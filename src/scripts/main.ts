/**
 * Site-wide interactions. Bundled once by Astro; works with View Transitions:
 * persistent things (Lenis smooth scroll) are created once, page-level things
 * are set up on `astro:page-load` and torn down on `astro:before-swap`.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- smooth scroll (once) ---------- */
let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

let pageAbort: AbortController | null = null;
let observers: IntersectionObserver[] = [];
let mm: gsap.MatchMedia | null = null;

document.addEventListener('astro:page-load', () => {
  pageAbort = new AbortController();
  const { signal } = pageAbort;

  initHeader(signal);
  initMenu(signal);
  initReveal();
  initCounters();
  initFilter(signal);
  initForm(signal);
  initSlideshow(signal);
  initFloor(signal);
  if (!reduceMotion) initMotion();

  // Recalculate positions once fonts/images settle
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});

document.addEventListener('astro:before-swap', () => {
  pageAbort?.abort();
  observers.forEach((o) => o.disconnect());
  observers = [];
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lenis?.start();
});

document.addEventListener('astro:after-swap', () => {
  lenis?.resize();
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
    open ? lenis?.stop() : lenis?.start();
  };
  set(false);
  toggle.addEventListener('click', () => set(!document.body.classList.contains('menu-open')), { signal });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false), { signal }));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && set(false), { signal });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && set(false), { signal });
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${(i % 6) * 0.08}s`);
    });
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- number counters ---------- */
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
        if (reduceMotion) return void (el.textContent = fmt.format(end) + suffix);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v)) + suffix),
        });
      });
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- GSAP motion ---------- */
function initMotion() {
  // Hero headline: lines slide up
  const heroLines = document.querySelectorAll('.hero .line > span, .page-hero .line > span');
  if (heroLines.length) {
    gsap.from(heroLines, { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.1 });
  }

  // Photo backgrounds: slow parallax as the section scrolls away
  document.querySelectorAll<HTMLElement>('.press-band [data-photo-bg]').forEach((bg) => {
    bg.classList.add('photo-bg--parallax');
    gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Image parallax
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.1) * 100;
    gsap.fromTo(el, { yPercent: -amt / 2 }, {
      yPercent: amt / 2,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('.media') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Process: horizontal scroll on desktop
  mm = gsap.matchMedia();
  mm.add('(min-width: 1000px)', () => {
    const section = document.querySelector<HTMLElement>('.process');
    const pin = section?.querySelector<HTMLElement>('.process__pin');
    const track = section?.querySelector<HTMLElement>('.process__track');
    if (!section || !pin || !track) return;
    const distance = () => Math.max(0, track.scrollWidth - (pin.querySelector('.container') as HTMLElement).clientWidth);
    if (distance() < 40) { section.classList.add('no-pin'); return; }
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
  });
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
        if (show && !reduceMotion) gsap.fromTo(it, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      });
      ScrollTrigger.refresh();
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
      data.append('from_name', 'SGMC Printers website');
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
