'use strict';

/* =====================================================================
   CONFIG — ÚNICO LUGAR QUE VOCÊ PRECISA EDITAR
   ===================================================================== */
const CONFIG = {
  /* MÚSICA — "Supernova" (aespa).
     Cole abaixo o ID do vídeo OFICIAL no YouTube (o trecho depois de "v=" na URL).
     Enquanto estiver vazio, o site mostra apenas um link para o YouTube. */
  music: {
    youtubeId: "sB9z8zdbhqA",
    fallbackUrl: "https://www.youtube.com/results?search_query=aespa+Supernova+MV"
  },

  /* FOTOS — 6 capítulos (pode ir até 10: basta copiar um bloco).
     src: caminho da foto, ex.: "assets/images/foto-01.jpg". Vazio = espaço reservado.
     alt: descrição da foto (acessibilidade).  caption: legenda curta.
     Opcionais: ratio ("4/5" padrão; use "4/3" para fotos deitadas) e pos (ponto do corte, ex.: "50% 20%"). */
  photos: [
    { src: "assets/images/foto-01.jpg", alt: "Jovem de camisa branca e gravata cobrindo parte do rosto com a mão, em uma varanda à noite", caption: "Te amo" },
    { src: "assets/images/foto-02.jpg", alt: "Jovem sorrindo, de camisa branca e gravata, apoiado em um corrimão à noite", caption: "Você é especial para mim" },
    { src: "assets/images/foto-03.jpg", alt: "Jovem de terno escuro olhando para o lado, em uma varanda à noite", caption: "Feliz aniversário, irmão" },
    { src: "assets/images/foto-04.jpg", alt: "Jovem de terno escuro com a mão no rosto, em uma varanda à noite", caption: "Mesmo você sendo gay, gosto muito de você" },
    { src: "assets/images/foto-05.jpg", alt: "Selfie em close de um jovem deitado", caption: "Conte comigo para tudo", ratio: "4/3", pos: "50% 40%" },
    { src: "assets/images/foto-06.jpg", alt: "Jovem de camiseta marrom olhando por cima do ombro, em uma rua ao entardecer", caption: "E se o Flávio ganha, eu prometo não te jogar na fogueira" }
  ],

  /* MENSAGEM PESSOAL — um item por parágrafo. */
  message: [
    "Irmãozinho,",
    "Hoje você completa mais um ano de vida, e eu não poderia deixar essa data passar sem te lembrar do quanto você é especial para mim.",
    "Você apareceu na minha vida de uma forma tão estranha e inusitada, de um jeito que eu jamais imaginaria, mas sou imensamente grato por isso. Às vezes, as pessoas chegam à nossa vida de maneiras inesperadas e, quando percebemos, já se tornaram importantes demais para imaginar nossos dias sem elas. E foi exatamente assim com você.",
    "Em apenas um ano, você se tornou alguém tão especial para mim. Eu te amo muito, Yan, e espero que você nunca se esqueça do quanto a sua existência é importante. Espero que consiga enxergar o bem que faz às pessoas ao seu redor e entender que a sua presença é capaz de trazer felicidade, mesmo quando você nem percebe.",
    "Que seu novo ciclo seja repleto de felicidade, amor, paz e momentos que façam você sorrir de verdade. Você merece todas as coisas boas que a vida tem a oferecer.",
    "Aproveite muito o seu dia, Yan. Feliz aniversário! ❤️",
    "E nunca se esqueça: independentemente do que aconteça, eu sempre estarei aqui por você."
  ],

  /* MENSAGEM FINAL (encerramento) */
  finalMessage: "Independentemente do que aconteça, eu sempre estarei aqui por você."
};

/* ===================================================================== */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Partículas ---------- */
const Particles = (() => {
  const cv = $('#fx'), c = cv.getContext('2d');
  let W, H, amb = [], bst = [], raf = 0;
  const count = () => innerWidth < 700 ? 45 : 95;
  const color = () => { const r = Math.random(); return r < .06 ? '255,61,174' : r < .5 ? '139,92,246' : '220,222,240'; };
  const make = () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .4, a: Math.random() * .6 + .2, c: color() });
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; c.setTransform(d, 0, 0, d, 0, 0);
    amb = Array.from({ length: count() }, make);
  }
  function dot(p, l = 1) { c.fillStyle = `rgba(${p.c},${p.a * l})`; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); }
  function tick() {
    c.clearRect(0, 0, W, H); c.globalCompositeOperation = 'lighter';
    const pull = document.body.dataset.scene === '0';
    for (const p of amb) {
      if (pull) { p.vx += (W / 2 - p.x) * 3e-6; p.vy += (H / 2 - p.y) * 3e-6; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      dot(p);
    }
    bst = bst.filter(p => p.life > 0);
    for (const p of bst) { p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy *= .985; p.life -= .008; dot(p, p.life); }
    raf = requestAnimationFrame(tick);
  }
  function burst() {
    if (reduce) return;
    const n = innerWidth < 700 ? 90 : 160;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, s = Math.random() * 5 + 1;
      bst.push({ x: W / 2, y: H * .4, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: Math.random() * 2 + .6, a: .9, c: color(), life: 1 });
    }
  }
  function init() {
    if (reduce) return;
    size(); tick();
    addEventListener('resize', size);
    document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) tick(); });
  }
  return { init, burst };
})();

/* ---------- Navegação ---------- */
const scenes = $$('.scene'), dots = $$('.dots button');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting && e.target.closest('.scene.active')) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .2 });

function go(i) {
  if (i < 0 || i >= scenes.length) return;
  scenes.forEach((s, k) => { s.classList.toggle('active', k === i); s.inert = k !== i; s.scrollTop = 0; });
  document.body.dataset.scene = i;
  dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'step' : 'false'));
  $('#prev').disabled = i === 0;
  $('#next').disabled = i === scenes.length - 1;
  $$('.chapter').forEach(ch => { ch.classList.remove('in'); io.unobserve(ch); io.observe(ch); });
  scenes[i].querySelector('h1,h2').focus({ preventScroll: true });
  if (i === 4) Particles.burst();
}
const current = () => +document.body.dataset.scene;

function restart() {
  const s = scenes[0];
  s.classList.remove('intro'); void s.offsetWidth; s.classList.add('intro');
  go(0);
}

/* ---------- Galeria ---------- */
function buildGallery() {
  const ol = $('#gallery');
  CONFIG.photos.slice(0, 10).forEach((p, i) => {
    const n = String(i + 1).padStart(2, '0');
    const li = document.createElement('li'); li.className = 'chapter';
    const fig = document.createElement('figure');
    const media = document.createElement('div'); media.className = 'media';
    if (p.ratio) media.style.setProperty('--ratio', p.ratio);
    const placeholder = () => {
      const ph = document.createElement('div'); ph.className = 'ph'; ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', `Espaço reservado para a foto ${n}`);
      ph.textContent = `Foto ${n}: adicione em CONFIG.photos`;
      media.replaceChildren(ph);
    };
    if (p.src) {
      const img = new Image(); img.src = p.src; img.alt = p.alt || ''; img.loading = 'lazy'; img.onerror = placeholder;
      if (p.pos) img.style.objectPosition = p.pos;
      media.append(img);
    } else placeholder();
    const cap = document.createElement('figcaption');
    const chap = document.createElement('span'); chap.className = 'chap'; chap.textContent = `Capítulo ${n}`;
    const t = document.createElement('p'); t.textContent = p.caption;
    cap.append(chap, t); fig.append(media, cap); li.append(fig); ol.append(li);
  });
}

/* ---------- Mensagem ---------- */
function buildMessage() {
  CONFIG.message.forEach((t, i) => {
    const p = document.createElement('p'); p.textContent = t; p.style.setProperty('--i', i); $('#msgText').append(p);
  });
  $('#finalMsg').textContent = CONFIG.finalMessage;
  $('#openMsg').addEventListener('click', e => {
    const open = $('#msgPanel').classList.toggle('open');
    $('#msgPanel').setAttribute('aria-hidden', !open);
    e.currentTarget.setAttribute('aria-expanded', open);
    e.currentTarget.textContent = open ? 'Fechar mensagem' : 'Abrir minha mensagem';
  });
}

/* ---------- Música ---------- */
const Music = (() => {
  const btn = $('#musicBtn'), link = $('#musicLink'), note = $('#musicNote');
  let player = null, playing = false;
  function ui(on) {
    playing = on; btn.setAttribute('aria-pressed', on);
    btn.querySelector('span').textContent = on ? 'Pausar música' : 'Tocar música';
  }
  function fallback() { btn.hidden = true; link.hidden = false; link.href = CONFIG.music.fallbackUrl; note.hidden = !!CONFIG.music.youtubeId; }
  function create() {
    player = new YT.Player('yt', { videoId: CONFIG.music.youtubeId, playerVars: { playsinline: 1, rel: 0 },
      events: { onReady: e => e.target.playVideo(), onStateChange: e => ui(e.data === 1), onError: fallback } });
  }
  function load() {
    if (window.YT && YT.Player) return create();
    window.onYouTubeIframeAPIReady = create;
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.onerror = fallback;
    document.head.append(s);
  }
  function toggle() {
    if (!player) return load();
    if (!player.playVideo) return;
    playing ? player.pauseVideo() : player.playVideo();
  }
  function start() { if (CONFIG.music.youtubeId && !playing) toggle(); }
  function init() {
    if (!CONFIG.music.youtubeId) { note.hidden = false; return fallback(); }
    btn.addEventListener('click', toggle);
  }
  return { init, start };
})();

/* ---------- Início ---------- */
buildGallery(); buildMessage(); Music.init(); Particles.init();
$('#enter').addEventListener('click', () => { go(1); Music.start(); });
$('#prev').addEventListener('click', () => go(current() - 1));
$('#next').addEventListener('click', () => go(current() + 1));
$('#again').addEventListener('click', restart);
$('#backMsg').addEventListener('click', () => go(3));
dots.forEach(d => d.addEventListener('click', () => d.dataset.go === '0' ? restart() : go(+d.dataset.go)));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(current() + 1);
  if (e.key === 'ArrowLeft') go(current() - 1);
});
scenes.forEach((s, k) => { s.inert = k !== 0; });
dots[0].setAttribute('aria-current', 'step');
$('#prev').disabled = true;
