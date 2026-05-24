/**
 * Section navigation and scroll utilities.
 */
function S(id, btn) {
  document.querySelectorAll('.sec').forEach(function (s) { s.classList.remove('on'); });
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.remove('on'); });
  var sec = document.getElementById(id);
  if (sec) sec.classList.add('on');
  if (btn && btn.classList) btn.classList.add('on');
  window.scrollTo(0, 0);
}

function initBackToTop() {
  var btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
}
