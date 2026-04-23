/**
 * NPTEL Blockchain exam prep: UI behaviour (navigation, questions, mock test, tracker).
 * Depends on globals from mock-questions.js (MQ) and tracker-topics.js (TOPICS).
 */

// ----- Section tabs (sticky nav) -----
function S(id, btn){
  document.querySelectorAll('.sec').forEach(function(s){s.classList.remove('on')});
  document.querySelectorAll('.nb').forEach(function(b){b.classList.remove('on')});
  document.getElementById(id).classList.add('on');
  if(btn && btn.classList) btn.classList.add('on');
  window.scrollTo(0,0);
}

// ----- Static practice cards (inline onclick="pick(...)") -----
function pick(el,r){
  var l=el.parentElement;
  if(l.dataset.done) return;
  l.dataset.done='1';
  /* Wrong answers stay visible; right picks get .ok (see CSS). */
  if(r==='no'){
    l.querySelectorAll('li').forEach(function(li){
      if(li===el) li.classList.add('no');
    });
  } else {
    el.classList.add('ok');
  }
}

// ----- "Show answer" toggles hidden explanation blocks -----
function rv(id,btn){
  document.getElementById(id).classList.add('show');
  btn.style.display='none';
}

// ----- Mock test (30 questions, rendered from MQ) -----
var ms=0, ma=0;

function buildMock(){
  var h='';
  MQ.forEach(function(q,i){
    var num = i < 9 ? '0'+(i+1) : ''+(i+1);
    h += '<div class="qc" data-idx="'+i+'">';
    h += '<div class="qm"><span class="qn">M&middot;'+num+'</span></div>';
    h += '<div class="qt">'+q.q+'</div>';
    h += '<ul class="opts">';
    q.o.forEach(function(o){
      var letter = o.charAt(0);
      h += '<li onclick="mpick(this,\'' + letter + '\',' + i + ')">' + o + '</li>';
    });
    h += '</ul>';
    h += '<div class="ans" id="ma'+i+'"><div class="al">Explanation</div>'+q.e+'</div>';
    h += '</div>';
  });
  document.getElementById('mock-qs').innerHTML = h;
}

/** Records one mock answer, highlights correct option, updates score strip. */
function mpick(el, chosen, idx){
  var list = el.parentElement;
  if(list.dataset.done) return;
  list.dataset.done = '1';
  ma++;
  var correct = MQ[idx].c;
  list.querySelectorAll('li').forEach(function(li){
    if(li.textContent.charAt(0) === correct) li.classList.add('rv');
  });
  if(chosen === correct){ el.classList.add('ok'); ms++; }
  else { el.classList.add('no'); }
  document.getElementById('ma'+idx).classList.add('show');
  updateMock();
}

function updateMock(){
  document.getElementById('sd').textContent = ms + ' / 30';
  document.getElementById('ps2').textContent = ms;
  document.getElementById('sb2').style.width = (ms/30*100) + '%';
  var pct = Math.round(ms / ma * 100) || 0;
  var g = pct >= 80 ? 'Excellent — exam ready!' : pct >= 60 ? 'Good — review wrong answers' : 'Keep practicing — focus on weak areas';
  document.getElementById('grade').textContent = ma + ' answered | ' + pct + '% accuracy | ' + g;
}

// ----- Exam countdown (header + tracker tab); change EXAM_AT if your slot differs -----
var EXAM_AT = '2026-04-25T09:00:00';

function startCountdown(){
  var exam = new Date(EXAM_AT);
  var now = new Date();
  var diff = exam - now;
  var countEl = document.getElementById('countdown');
  if(diff <= 0){
    if(countEl) countEl.textContent = 'Exam day!';
    ['t-days','t-hrs','t-min'].forEach(function(id){
      var e = document.getElementById(id); if(e) e.textContent = '00';
    });
    return;
  }
  var days = Math.floor(diff / 86400000);
  var hrs  = Math.floor((diff % 86400000) / 3600000);
  var mins = Math.floor((diff % 3600000) / 60000);
  if(countEl) countEl.textContent = days + 'd ' + hrs + 'h ' + mins + 'm';
  var td = document.getElementById('t-days');
  var th = document.getElementById('t-hrs');
  var tm = document.getElementById('t-min');
  if(td) td.textContent = days;
  if(th) th.textContent = hrs;
  if(tm) tm.textContent = mins;
}

// ----- Topic tracker (localStorage key: bcTracker) -----
var topicStatus = {};

function loadStatus(){
  try {
    var saved = localStorage.getItem('bcTracker');
    if(saved) topicStatus = JSON.parse(saved);
  } catch(e) { topicStatus = {}; }
}

function saveStatus(){
  try { localStorage.setItem('bcTracker', JSON.stringify(topicStatus)); } catch(e) {}
}

/** Rebuilds tracker DOM from TOPICS + topicStatus; escapes quotes in generated onclick attributes. */
function buildTracker(){
  loadStatus();
  var h = '';
  TOPICS.forEach(function(wk, wi){
    h += '<div class="track-card">';
    h += '<h4>' + wk.w;
    h += '<div style="display:flex;gap:4px">';
    h += '<button class="track-btn" onclick="markAllWeek(' + wi + ',\'done\')">All ✓</button>';
    h += '<button class="track-btn" onclick="markAllWeek(' + wi + ',\'none\')">Clear</button>';
    h += '</div></h4>';
    wk.items.forEach(function(item, ii){
      var key = wi + '-' + ii;
      var st = topicStatus[key] || 'none';
      var dotCls = st === 'done' ? 'dot-ok' : st === 'weak' ? 'dot-weak' : 'dot-none';
      var doneActive = st === 'done' ? ' done' : '';
      var weakActive = st === 'weak' ? ' weak' : '';
      h += '<div class="track-item" id="ti-' + key + '">';
      h += '<span style="flex:1;cursor:pointer" onclick="cycleStatus(\'' + key + '\')">' + item + '</span>';
      h += '<div style="display:flex;gap:4px;align-items:center">';
      h += '<div class="status-dot ' + dotCls + '" id="dot-' + key + '"></div>';
      h += '<button class="track-btn' + doneActive + '" onclick="setStatus(\'' + key + '\',\'done\')">&#10003;</button>';
      h += '<button class="track-btn' + weakActive + '" onclick="setStatus(\'' + key + '\',\'weak\')">&#9888;</button>';
      h += '</div></div>';
    });
    h += '</div>';
  });
  var el = document.getElementById('tracker-grid');
  if(el) el.innerHTML = h;
  updateWeakList();
}

function setStatus(key, st){
  topicStatus[key] = st;
  saveStatus();
  buildTracker();
}

function cycleStatus(key){
  var cur = topicStatus[key] || 'none';
  var next = cur === 'none' ? 'done' : cur === 'done' ? 'weak' : 'none';
  setStatus(key, next);
}

function markAllWeek(wi, st){
  TOPICS[wi].items.forEach(function(_, ii){
    topicStatus[wi + '-' + ii] = st;
  });
  saveStatus();
  buildTracker();
}

function updateWeakList(){
  var weaks = [];
  TOPICS.forEach(function(wk, wi){
    wk.items.forEach(function(item, ii){
      if(topicStatus[wi + '-' + ii] === 'weak') weaks.push('[' + wk.w + '] ' + item);
    });
  });
  var el = document.getElementById('weak-list');
  if(!el) return;
  if(weaks.length === 0){
    el.textContent = 'No weak topics marked — you are good to go!';
    el.style.color = '#4ade80';
  } else {
    var html = weaks.map(function(w){
      return '<div style="padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04);color:#f87171">&#9888; ' + w + '</div>';
    }).join('');
    el.innerHTML = html;
    el.style.color = '';
  }
}

// ----- Boot -----
buildMock();
startCountdown();
buildTracker();
setInterval(startCountdown, 30000);
