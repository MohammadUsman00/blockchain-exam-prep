/**
 * Static practice question interactions (inline onclick handlers).
 */
function pick(el, r) {
  var l = el.parentElement;
  if (l.dataset.done) return;
  l.dataset.done = '1';
  if (r === 'no') {
    l.querySelectorAll('li').forEach(function (li) {
      if (li === el) li.classList.add('no');
    });
  } else {
    el.classList.add('ok');
  }
}

function rv(id, btn) {
  var el = document.getElementById(id);
  if (el) el.classList.add('show');
  if (btn) btn.style.display = 'none';
}
