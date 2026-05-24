/**
 * Royal theme switcher — persists choice in localStorage (bcTheme).
 */
var THEME_KEY = 'bcTheme';
var DEFAULT_THEME = 'royal-noir';

function setTheme(name, btn) {
  document.documentElement.setAttribute('data-theme', name);
  try { localStorage.setItem(THEME_KEY, name); } catch (e) {}
  document.querySelectorAll('.theme-btn').forEach(function (b) { b.classList.remove('on'); });
  if (btn) btn.classList.add('on');
}

function initTheme() {
  var saved = DEFAULT_THEME;
  try {
    var v = localStorage.getItem(THEME_KEY);
    if (v) saved = v;
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', saved);
  document.querySelectorAll('.theme-btn').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-theme') === saved);
  });
}
