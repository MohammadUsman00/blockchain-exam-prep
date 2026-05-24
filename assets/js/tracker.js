/**
 * Topic confidence tracker — localStorage key: bcTracker
 */
var topicStatus = {};
var TRACKER_KEY = 'bcTracker';
var RING_CIRC = 188.5;

function loadStatus() {
  try {
    var saved = localStorage.getItem(TRACKER_KEY);
    if (saved) topicStatus = JSON.parse(saved);
  } catch (e) { topicStatus = {}; }
}

function saveStatus() {
  try { localStorage.setItem(TRACKER_KEY, JSON.stringify(topicStatus)); } catch (e) {}
}

function countTopics() {
  var total = 0, done = 0, weak = 0;
  TOPICS.forEach(function (wk, wi) {
    wk.items.forEach(function (_, ii) {
      total++;
      var st = topicStatus[wi + '-' + ii] || 'none';
      if (st === 'done') done++;
      if (st === 'weak') weak++;
    });
  });
  return { total: total, done: done, weak: weak };
}

function updateProgressUI() {
  var c = countTopics();
  var pct = c.total ? Math.round(c.done / c.total * 100) : 0;
  var ring = document.getElementById('ring-fill');
  var pctEl = document.getElementById('progress-pct');
  var detail = document.getElementById('progress-detail');
  var header = document.getElementById('header-progress');
  if (ring) ring.style.strokeDashoffset = RING_CIRC - (pct / 100 * RING_CIRC);
  if (pctEl) pctEl.textContent = pct + '%';
  if (header) header.textContent = pct + '%';
  if (detail) {
    detail.innerHTML = '<b>' + c.done + '</b> of ' + c.total + ' topics mastered';
    if (c.weak) detail.innerHTML += ' · <span class="weak-count">' + c.weak + ' weak</span> need revision';
    else detail.innerHTML += ' · no weak topics flagged';
  }
}

function buildTracker() {
  loadStatus();
  var h = '';
  TOPICS.forEach(function (wk, wi) {
    h += '<div class="track-card"><h4>' + wk.w;
    h += '<div class="track-actions">';
    h += '<button class="track-btn" onclick="markAllWeek(' + wi + ',\'done\')">All ✓</button>';
    h += '<button class="track-btn" onclick="markAllWeek(' + wi + ',\'none\')">Clear</button>';
    h += '</div></h4>';
    wk.items.forEach(function (item, ii) {
      var key = wi + '-' + ii;
      var st = topicStatus[key] || 'none';
      var dotCls = st === 'done' ? 'dot-ok' : st === 'weak' ? 'dot-weak' : 'dot-none';
      var doneActive = st === 'done' ? ' done' : '';
      var weakActive = st === 'weak' ? ' weak' : '';
      h += '<div class="track-item" id="ti-' + key + '">';
      h += '<span class="track-label" onclick="cycleStatus(\'' + key + '\')">' + item + '</span>';
      h += '<div class="track-controls">';
      h += '<div class="status-dot ' + dotCls + '" id="dot-' + key + '"></div>';
      h += '<button class="track-btn' + doneActive + '" onclick="setStatus(\'' + key + '\',\'done\')">&#10003;</button>';
      h += '<button class="track-btn' + weakActive + '" onclick="setStatus(\'' + key + '\',\'weak\')">&#9888;</button>';
      h += '</div></div>';
    });
    h += '</div>';
  });
  var el = document.getElementById('tracker-grid');
  if (el) el.innerHTML = h;
  updateWeakList();
  updateProgressUI();
}

function setStatus(key, st) {
  topicStatus[key] = st;
  saveStatus();
  buildTracker();
}

function cycleStatus(key) {
  var cur = topicStatus[key] || 'none';
  var next = cur === 'none' ? 'done' : cur === 'done' ? 'weak' : 'none';
  setStatus(key, next);
}

function markAllWeek(wi, st) {
  TOPICS[wi].items.forEach(function (_, ii) {
    topicStatus[wi + '-' + ii] = st;
  });
  saveStatus();
  buildTracker();
}

function updateWeakList() {
  var weaks = [];
  TOPICS.forEach(function (wk, wi) {
    wk.items.forEach(function (item, ii) {
      if (topicStatus[wi + '-' + ii] === 'weak') weaks.push('[' + wk.w + '] ' + item);
    });
  });
  var el = document.getElementById('weak-list');
  if (!el) return;
  if (weaks.length === 0) {
    el.className = 'weak-empty';
    el.textContent = 'No weak topics marked — you are good to go!';
  } else {
    el.className = '';
    el.innerHTML = weaks.map(function (w) {
      return '<div class="weak-item">&#9888; ' + w + '</div>';
    }).join('');
  }
}
