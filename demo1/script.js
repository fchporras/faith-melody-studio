/* Storefront behavior: sample player, pricing cards and the order form.
   Shop settings live in config.js. The sample songs live in songs.js (written by tools/build_media.py). */
(function () {
  'use strict';

  const CFG = window.STORE_CONFIG || {};
  const SONGS = window.STORE_SONGS || [];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => (CFG.currency || '$') + n;
  const clock = (s) => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ shop name, year, ticker, menu */
  const brand = CFG.brand || 'Dear Song';
  $$('[data-brand]').forEach((el) => { el.textContent = brand; });
  document.title = brand + ' — Custom songs made from your story';
  $('#year').textContent = new Date().getFullYear();

  const ticker = $('#ticker');
  ticker.innerHTML += ticker.innerHTML;   // two copies, so the loop has no seam

  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');
  const setMenu = (open) => { navLinks.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav-pill')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ------------------------------------------------------------ sample player */
  const audio = new Audio();
  audio.preload = 'none';
  const INTRO_LEAD = 2;       // start this many seconds before the first sung line
  const MINI_BARS = 30;
  let index = 0;              // which song
  let lang = 'en';
  let loaded = false;         // the current version's file has been handed to <audio>
  let startAt = 0;            // where playback begins once the file is loaded
  let lineNow = -2;

  const tracksEl = $('#tracks');
  const waveEl = $('#wave');
  const canvas = $('canvas', waveEl);
  const ctx = canvas.getContext('2d');
  const roll = $('#lyricsRoll');
  const miniBars = $('#miniBars');
  const nowPill = $('#nowPill');

  const song = () => SONGS[index];
  const version = () => song().versions[lang] || song().versions.en;
  const introStart = (v) => Math.max(0, (v.lines.length ? v.lines[0][0] : 0) - INTRO_LEAD);
  const position = () => (loaded && audio.readyState > 0 ? audio.currentTime : startAt);
  const playing = () => loaded && !audio.paused && !audio.ended;

  /* Squash the stored peaks down to `count` bars, keeping the loudest value in each group. */
  function squash(peaks, count) {
    if (count >= peaks.length) return peaks;
    const out = [];
    for (let i = 0; i < count; i++) {
      const from = Math.floor((i * peaks.length) / count);
      const to = Math.max(from + 1, Math.floor(((i + 1) * peaks.length) / count));
      out.push(Math.max.apply(null, peaks.slice(from, to)));
    }
    return out;
  }

  function renderTracks() {
    tracksEl.innerHTML = SONGS.map((s, i) => {
      const v = s.versions[lang] || s.versions.en;
      return `<li><button class="track" type="button" data-track="${i}">
        <img src="${esc(s.art)}" alt="" width="56" height="56" loading="lazy">
        <span><b>${esc(v.title)}</b><span class="sub">${esc(s.occasion)} · ${esc(v.sound)}</span></span>
        <span class="len">${clock(v.dur)}</span></button></li>`;
    }).join('');
    markTrack();
  }

  function markTrack() {
    $$('.track', tracksEl).forEach((b, i) => {
      b.classList.toggle('on', i === index);
      if (i === index) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }

  /* Show the chosen song and language everywhere. Does not start playback by itself. */
  function showVersion() {
    const s = song();
    const v = version();
    loaded = false;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();             // drop the previous file so it stops downloading
    startAt = introStart(v);
    lineNow = -2;

    $$('[data-now-title]').forEach((el) => { el.textContent = v.title; });
    $$('[data-now-tag]').forEach((el) => { el.textContent = s.occasion + ' · ' + v.sound; });
    $('#deckArt').src = s.art;
    $('#tDur').textContent = clock(v.dur);
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    roll.innerHTML = v.lines.map((l) => `<p>${esc(l[1])}</p>`).join('');
    roll.lang = lang;
    miniBars.innerHTML = squash(v.peaks, MINI_BARS).map((p) => `<i style="--h:${p}%"></i>`).join('');
    renderTracks();
    paint();
    syncPlayUi();
  }

  function load() {
    loaded = true;
    audio.src = version().src;
  }
  audio.addEventListener('loadedmetadata', () => { if (startAt > 0) audio.currentTime = startAt; });

  function play() {
    if (!SONGS.length) return;
    if (!loaded) load();
    const p = audio.play();
    if (p && p.catch) p.catch(() => syncPlayUi());
  }

  function toggle() { if (playing()) audio.pause(); else play(); }

  function choose(i, andPlay) {
    index = (i + SONGS.length) % SONGS.length;
    showVersion();
    if (andPlay) play();
  }

  function seek(seconds) {
    const v = version();
    const t = Math.min(Math.max(0, seconds), Math.max(0, v.dur - 0.25));
    if (loaded && audio.readyState > 0) audio.currentTime = t;
    else { startAt = t; if (!loaded) play(); }
    paint();
  }

  function syncPlayUi() {
    const on = playing();
    $$('[data-play-icon]').forEach((u) => u.setAttribute('href', on ? '#i-pause' : '#i-play'));
    $$('[data-play-word]').forEach((w) => { w.textContent = on ? 'Pause' : 'Hear a sample'; });
    updatePill();
    if (on) requestAnimationFrame(tick);
  }

  /* --- drawing: waveform, clock, mini bars, lyrics --- */
  function sizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(waveEl.clientWidth * ratio);
    const h = Math.round(waveEl.clientHeight * ratio);
    if (w && h && (canvas.width !== w || canvas.height !== h)) { canvas.width = w; canvas.height = h; }
  }

  function drawWave(progress) {
    const w = waveEl.clientWidth;
    const h = waveEl.clientHeight;
    if (!w || !h) return;
    const ratio = canvas.width / w;
    const bars = squash(version().peaks, Math.max(24, Math.floor(w / 6)));
    const step = w / bars.length;
    const barW = Math.max(2, step - 2.5);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, w, h);
    bars.forEach((p, i) => {
      const barH = Math.max(4, (p / 100) * h);
      ctx.fillStyle = (i + 0.5) / bars.length <= progress ? '#F26F12' : '#C5CEE2';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(i * step + (step - barW) / 2, (h - barH) / 2, barW, barH, barW / 2);
      else ctx.rect(i * step + (step - barW) / 2, (h - barH) / 2, barW, barH);
      ctx.fill();
    });
  }

  function paintLyrics(t) {
    const lines = version().lines;
    let now = -1;
    for (let i = 0; i < lines.length; i++) { if (lines[i][0] <= t) now = i; else break; }
    if (now === lineNow) return;
    lineNow = now;
    const rows = roll.children;
    for (let i = 0; i < rows.length; i++) rows[i].classList.toggle('now', i === now);
    const row = rows[Math.max(now, 0)];
    if (row) roll.style.transform = `translateY(${roll.parentElement.clientHeight / 2 - row.offsetTop - row.offsetHeight / 2}px)`;
  }

  function paint() {
    const v = version();
    const t = position();
    const progress = v.dur ? Math.min(1, t / v.dur) : 0;
    drawWave(progress);
    $$('[data-now-time]').forEach((el) => { el.textContent = clock(t); });
    waveEl.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    waveEl.setAttribute('aria-valuetext', clock(t) + ' of ' + clock(v.dur));
    const bars = miniBars.children;
    for (let i = 0; i < bars.length; i++) bars[i].classList.toggle('on', (i + 0.5) / bars.length <= progress);
    paintLyrics(t);
  }

  function tick() { paint(); if (playing()) requestAnimationFrame(tick); }

  /* --- player events --- */
  ['play', 'playing', 'pause'].forEach((type) => audio.addEventListener(type, syncPlayUi));
  ['timeupdate', 'seeked'].forEach((type) => audio.addEventListener(type, () => { if (!playing()) paint(); }));
  audio.addEventListener('ended', () => {
    if (index < SONGS.length - 1) choose(index + 1, true);
    else choose(0, false);                 // after the last sample, stop and go back to the first
  });
  audio.addEventListener('error', () => {
    if (!loaded) return;                   // clearing the source also fires this; ignore it
    loaded = false;
    syncPlayUi();
    roll.innerHTML = '<p class="now">This sample could not be loaded. Please try another one.</p>';
    roll.style.transform = 'translateY(3.4rem)';
  });

  document.addEventListener('click', (e) => {
    const trackBtn = e.target.closest('[data-track]');
    if (trackBtn) {
      const i = Number(trackBtn.dataset.track);
      if (i === index) toggle(); else choose(i, true);
      return;
    }
    if (e.target.closest('[data-toggle-play]')) { toggle(); return; }
    const langBtn = e.target.closest('[data-lang]');
    if (langBtn && langBtn.dataset.lang !== lang) {
      const wasPlaying = playing();
      lang = langBtn.dataset.lang;
      showVersion();
      if (wasPlaying) play();
    }
  });
  $('#prev').addEventListener('click', () => choose(index - 1, playing()));
  $('#next').addEventListener('click', () => choose(index + 1, playing()));

  /* The waveform is the seek bar: click, drag, or use the arrow keys. */
  let dragging = false;
  const seekFromPointer = (e) => {
    const box = waveEl.getBoundingClientRect();
    seek(((e.clientX - box.left) / box.width) * version().dur);
  };
  waveEl.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    dragging = true;
    try { waveEl.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
    seekFromPointer(e);
  });
  waveEl.addEventListener('pointermove', (e) => { if (dragging) seekFromPointer(e); });
  ['pointerup', 'pointercancel'].forEach((type) => waveEl.addEventListener(type, () => { dragging = false; }));
  waveEl.addEventListener('keydown', (e) => {
    const jump = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 15, PageDown: -15 }[e.key];
    if (jump) seek(position() + jump);
    else if (e.key === 'Home') seek(0);
    else if (e.key === 'End') seek(version().dur);
    else if (e.key === ' ' || e.key === 'Enter') toggle();
    else return;
    e.preventDefault();
  });

  if ('ResizeObserver' in window) new ResizeObserver(() => { sizeCanvas(); lineNow = -2; paint(); }).observe(waveEl);
  else window.addEventListener('resize', () => { sizeCanvas(); lineNow = -2; paint(); });

  /* The floating pill appears while a song plays and neither player is on screen. */
  const onScreen = new Set();
  function updatePill() { nowPill.classList.toggle('show', playing() && onScreen.size === 0); }
  if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) onScreen.add(en.target); else onScreen.delete(en.target); });
      updatePill();
    });
    [$('#deck'), $('#mini')].forEach((el) => watcher.observe(el));
  }

  /* ------------------------------------------------------------ pricing, from config.js */
  const packages = CFG.packages || [];
  const specials = CFG.specials || [];
  const addons = CFG.addons || [];
  const plans = packages.concat(specials);
  const priceLabel = (p) => (p.from ? 'from ' : '') + money(p.price);

  $('#prices').innerHTML = packages.map((p) => `
    <article class="price rise${p.featured ? ' featured' : ''}">
      ${p.featured ? '<span class="flag">Our pick</span>' : ''}
      <h3>${esc(p.name)}</h3>
      <p class="tagline">${esc(p.tagline || '')}</p>
      <p class="amount">${p.from ? '<small>from </small>' : ''}${esc(money(p.price))}</p>
      <ul>${(p.items || []).map((it) => `<li>${icon('check')}<span>${esc(it)}</span></li>`).join('')}</ul>
      <button class="btn btn-block${p.featured ? '' : ' btn-navy'}" type="button" data-order data-package="${esc(p.id)}">Choose ${esc(p.name)}</button>
    </article>`).join('');

  $('#specials').innerHTML = specials.map((p) => `
    <article class="special rise">
      <span class="ico">${icon(p.icon === 'biz' ? 'biz' : 'group')}</span>
      <div>
        <h3>${esc(p.name)} <span>${esc(priceLabel(p))}</span></h3>
        <p>${esc(p.text || '')}</p>
        <button type="button" data-order data-package="${esc(p.id)}">Start this one ${icon('arrow')}</button>
      </div>
    </article>`).join('');

  $('#addonList').innerHTML = addons.map((a) => `<li>${esc(a.name)} <b>+${esc(money(a.price))}</b></li>`).join('');
  if (!addons.length) { $('.addons').hidden = true; $('#addonField').hidden = true; }

  const cardOccasions = $$('.occ[data-occasion]').map((b) => b.dataset.occasion);
  $('#moreChips').innerHTML = (CFG.occasions || []).filter((o) => !cardOccasions.includes(o))
    .map((o) => `<button type="button" data-order data-occasion="${esc(o)}">${esc(o)}</button>`).join('');

  /* ------------------------------------------------------------ order form */
  const dialog = $('#order');
  const form = $('#orderForm');
  const done = $('#orderDone');
  const fOccasion = $('#fOccasion');
  const fSound = $('#fSound');
  const fLanguage = $('#fLanguage');
  const pkgChoices = $('#pkgChoices');
  const addonChoices = $('#addonChoices');
  const formError = $('#formError');
  const sendNote = $('#sendNote');
  let sample = '';        // set when the buyer clicks "I want one like this"
  let opener = null;

  const option = (text) => `<option>${esc(text)}</option>`;
  fOccasion.innerHTML = (CFG.occasions || ['Birthday']).map(option).join('');
  fSound.innerHTML = (CFG.sounds || ['Surprise me']).map(option).join('');

  pkgChoices.innerHTML = plans.map((p) => `
    <label class="pick"><input type="radio" name="package" value="${esc(p.id)}">
      <span><b>${esc(p.name)}</b>${p.tagline ? `<small>${esc(p.tagline)}</small>` : ''}</span>
      <span class="cost">${esc(priceLabel(p))}</span></label>`).join('');

  addonChoices.innerHTML = addons.map((a) => `
    <label class="tick"><input type="checkbox" name="addon" value="${esc(a.id)}"><span>${esc(a.name)}</span> <b></b></label>`).join('');

  const chosenPlan = () => {
    const picked = $('input[name="package"]:checked', form);
    return plans.find((p) => picked && p.id === picked.value) || plans[0];
  };
  const chosenAddons = () => {
    const included = (chosenPlan() || {}).includes || [];
    return addons.filter((a) => !included.includes(a.id) && $(`input[name="addon"][value="${a.id}"]`, form).checked);
  };
  const orderTotal = () => {
    const plan = chosenPlan();
    if (!plan) return '';
    return (plan.from ? 'from ' : '') + money(plan.price + chosenAddons().reduce((sum, a) => sum + a.price, 0));
  };

  /* Add-ons that the chosen package already contains are shown as included and can't be double-charged. */
  function refreshOrder() {
    const included = (chosenPlan() || {}).includes || [];
    addons.forEach((a) => {
      const box = $(`input[name="addon"][value="${a.id}"]`, form);
      const label = box.closest('.tick');
      const has = included.includes(a.id);
      if (has) box.checked = false;
      box.disabled = has;
      label.classList.toggle('included', has);
      $('b', label).textContent = has ? 'included' : '+' + money(a.price);
    });
    $('#orderTotal').textContent = orderTotal();
  }
  form.addEventListener('change', refreshOrder);

  /* Pick the option with this text. If the list doesn't have it, add it. */
  function pick(select, text) {
    if (!text) return;
    const wanted = text.toLowerCase();
    let found = Array.from(select.options).find((o) => o.value.toLowerCase() === wanted)
      || Array.from(select.options).find((o) => o.value.toLowerCase().startsWith(wanted));
    if (!found) { found = new Option(text); select.add(found); }
    select.value = found.value;
  }

  function showForm() { done.hidden = true; form.hidden = false; }

  function openOrder(preset) {
    preset = preset || {};
    opener = document.activeElement;
    setMenu(false);
    showForm();
    formError.hidden = true;
    pick(fOccasion, preset.occasion);
    pick(fSound, preset.sound);
    if (preset.language) fLanguage.value = preset.language;
    if ('sample' in preset) sample = preset.sample;
    const wanted = preset.package || (!$('input[name="package"]:checked', form) && ((packages.find((p) => p.featured) || plans[0] || {}).id));
    const radio = wanted && $(`input[name="package"][value="${wanted}"]`, form);
    if (radio) radio.checked = true;
    refreshOrder();
    if (dialog.showModal) { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute('open', '');
    dialog.scrollTop = 0;
    $('#fRecipient').focus();
  }

  function closeOrder() { if (dialog.close) dialog.close(); else dialog.removeAttribute('open'); }
  dialog.addEventListener('close', () => { if (opener && opener.focus) opener.focus(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeOrder(); });   // click on the backdrop
  $('#orderClose').addEventListener('click', closeOrder);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-order]');
    if (btn) openOrder({ occasion: btn.dataset.occasion, package: btn.dataset.package, sample: '' });
  });
  $('#likeThis').addEventListener('click', () => {
    const v = version();
    openOrder({ occasion: song().occasion, sound: v.sound, language: lang === 'es' ? 'Spanish' : 'English', sample: `“${v.title}” (${v.sound})` });
  });

  function orderText() {
    const plan = chosenPlan();
    const extras = chosenAddons();
    const val = (id) => $(id).value.trim();
    return [
      `NEW SONG ORDER: ${brand}`,
      '',
      `For: ${val('#fRecipient')}`,
      `Occasion: ${fOccasion.value}`,
      `Sound: ${fSound.value}`,
      `Language: ${val('#fLanguage') || 'English'}`,
      sample ? `Sample I liked: ${sample}` : null,
      '',
      'Their story:',
      val('#fMemory'),
      '',
      `Package: ${plan.name} (${priceLabel(plan)})`,
      extras.length ? `Add-ons: ${extras.map((a) => `${a.name} (+${money(a.price)})`).join(', ')}` : null,
      `Total: ${orderTotal()}`,
      '',
      `From: ${val('#fBuyer')}`,
    ].filter((line) => line !== null).join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = [$('#fRecipient'), $('#fMemory'), $('#fBuyer')];
    const missing = required.filter((el) => !el.value.trim());
    required.forEach((el) => {
      const bad = missing.includes(el);
      el.classList.toggle('bad', bad);
      if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    });
    if (missing.length) {
      formError.textContent = 'Please fill in who the song is for, a memory or two, and your name.';
      formError.hidden = false;
      missing[0].focus();
      return;
    }
    formError.hidden = true;

    const text = orderText();
    const email = (CFG.orderEmail || '').trim();
    const phone = String(CFG.whatsapp || '').replace(/\D/g, '');
    const mail = $('#sendMail');
    const wa = $('#sendWa');
    $('#orderText').textContent = text;
    mail.hidden = !email;
    wa.hidden = !phone;
    if (email) mail.href = `mailto:${email}?subject=${encodeURIComponent('Song order for ' + $('#fRecipient').value.trim())}&body=${encodeURIComponent(text.replace(/\n/g, '\r\n'))}`;
    if (phone) wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    $('#doneLead').textContent = email || phone
      ? 'Send it to us and we’ll reply with the total and how to pay.'
      : 'Copy your order and send it to us in a message. We’ll reply with the total and how to pay.';
    sendNote.textContent = '';
    form.hidden = true;
    done.hidden = false;
    dialog.scrollTop = 0;
    $('#doneTitle').focus();
  });
  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('bad') && e.target.value.trim()) { e.target.classList.remove('bad'); e.target.removeAttribute('aria-invalid'); }
  });

  $('#copyOrder').addEventListener('click', () => {
    const pre = $('#orderText');
    const ok = () => { sendNote.textContent = 'Copied. Paste it into a message to us.'; };
    const byHand = () => {
      const range = document.createRange();
      range.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (err) { /* fall through */ }
      if (copied) ok(); else sendNote.textContent = 'The text is selected. Press Ctrl+C or ⌘C to copy it.';
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pre.textContent).then(ok, byHand);
    else byHand();
  });
  $('#editOrder').addEventListener('click', () => { showForm(); $('#fRecipient').focus(); });

  if (!CFG.orderEmail && !CFG.whatsapp) {
    console.warn('[store] config.js has no orderEmail or whatsapp yet, so buyers can only copy their order as text.');
  }

  /* ------------------------------------------------------------ reveal on scroll */
  const risers = $$('.rise');
  if ('IntersectionObserver' in window && !calm) {
    const reveal = new IntersectionObserver((entries) => {
      let n = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        reveal.unobserve(el);
        el.style.transitionDelay = (n++ * 80) + 'ms';   // items that arrive together come in one after another
        el.classList.add('in');
        setTimeout(() => { el.style.transitionDelay = ''; }, 1200);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    risers.forEach((el) => reveal.observe(el));
  } else {
    risers.forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------------------------ start */
  if (SONGS.length) {
    sizeCanvas();
    showVersion();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { lineNow = -2; paint(); });
  } else {
    $('#listen').hidden = true;
    $$('[data-toggle-play]').forEach((el) => { el.hidden = true; });
    $('#mini').hidden = true;
  }
})();
