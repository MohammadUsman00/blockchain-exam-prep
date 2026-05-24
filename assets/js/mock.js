/**
 * Mock test — 30 questions from global MQ array.
 */
var ms = 0;
var ma = 0;

function buildMock() {
  var h = '';
  MQ.forEach(function (q, i) {
    var num = i < 9 ? '0' + (i + 1) : '' + (i + 1);
    h += '<div class="qc" data-idx="' + i + '">';
    h += '<div class="qm"><span class="qn">M&middot;' + num + '</span></div>';
    h += '<div class="qt">' + q.q + '</div><ul class="opts">';
    q.o.forEach(function (o) {
      var letter = o.charAt(0);
      h += '<li onclick="mpick(this,\'' + letter + '\',' + i + ')">' + o + '</li>';
    });
    h += '</ul><div class="ans" id="ma' + i + '"><div class="al">Explanation</div>' + q.e + '</div></div>';
  });
  var el = document.getElementById('mock-qs');
  if (el) el.innerHTML = h;
}

function mpick(el, chosen, idx) {
  var list = el.parentElement;
  if (list.dataset.done) return;
  list.dataset.done = '1';
  ma++;
  var correct = MQ[idx].c;
  list.querySelectorAll('li').forEach(function (li) {
    if (li.textContent.charAt(0) === correct) li.classList.add('rv');
  });
  if (chosen === correct) { el.classList.add('ok'); ms++; }
  else { el.classList.add('no'); }
  var ans = document.getElementById('ma' + idx);
  if (ans) ans.classList.add('show');
  updateMock();
}

function updateMock() {
  var sd = document.getElementById('sd');
  var ps2 = document.getElementById('ps2');
  var sb2 = document.getElementById('sb2');
  var grade = document.getElementById('grade');
  if (sd) sd.textContent = ms + ' / 30';
  if (ps2) ps2.textContent = ms;
  if (sb2) sb2.style.width = (ms / 30 * 100) + '%';
  var pct = Math.round(ms / ma * 100) || 0;
  var g = pct >= 80 ? 'Excellent — exam ready!' : pct >= 60 ? 'Good — review wrong answers' : 'Keep practicing — focus on weak areas';
  if (grade) grade.textContent = ma + ' answered | ' + pct + '% accuracy | ' + g;
}

function resetMock() {
  ms = 0;
  ma = 0;
  buildMock();
  updateMock();
}

function revealAllMock() {
  for (var i = 0; i < MQ.length; i++) {
    var el = document.getElementById('ma' + i);
    if (el) el.classList.add('show');
  }
}
