(function () {
  var list = document.querySelector('.ft-tabs');
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  list.hidden = false;
  document.getElementById('features').classList.add('js');
  function visible() { return tabs.filter(function (t) { return !t.hidden; }); }
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab, p = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (!p || p.hasAttribute('data-pending')) return;
      p.hidden = !on;
      if (on) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); }
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      var v = visible(), i = v.indexOf(t), n = null;
      if (e.key === 'ArrowRight') n = v[(i + 1) % v.length];
      else if (e.key === 'ArrowLeft') n = v[(i - 1 + v.length) % v.length];
      else if (e.key === 'Home') n = v[0];
      else if (e.key === 'End') n = v[v.length - 1];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });
  var q = (location.search.match(/[?&]tab=([\w-]+)/) || [])[1];
  var start = q && document.getElementById('tab-' + q);
  select(start && !start.hidden ? start : tabs[0], false);
  if (start && !start.hidden) document.getElementById('features').scrollIntoView();
})();
(function () {
  function mark() {
    document.querySelectorAll('.ft-frame').forEach(function (f) {
      var s = f.querySelector('.ft-scroll');
      f.classList.toggle('tall', s.scrollHeight > s.clientHeight + 2);
    });
  }
  window.addEventListener('load', mark); window.addEventListener('resize', mark);
  ['click','keyup'].forEach(function (ev) { document.addEventListener(ev, function () { setTimeout(mark, 30); }); });
  document.querySelectorAll('.ft-scroll img').forEach(function (i) { i.addEventListener('load', mark); });
})();
