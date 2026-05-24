/**
 * Global search across question cards and section titles.
 */
function doSearch(query) {
  var q = (query || '').trim().toLowerCase();
  var bar = document.getElementById('search-bar');
  var cards = document.querySelectorAll('.qc');
  var sections = document.querySelectorAll('.sec');

  if (!q) {
    cards.forEach(function (c) { c.classList.remove('search-hidden'); });
    sections.forEach(function (s) { s.classList.remove('search-empty'); });
    if (bar) { bar.classList.remove('visible'); bar.textContent = ''; }
    return;
  }

  var matchCount = 0;
  var visibleSections = {};

  cards.forEach(function (card) {
    var text = card.textContent.toLowerCase();
    var match = text.indexOf(q) !== -1;
    card.classList.toggle('search-hidden', !match);
    if (match) {
      matchCount++;
      var sec = card.closest('.sec');
      if (sec) visibleSections[sec.id] = true;
    }
  });

  sections.forEach(function (sec) {
    if (sec.classList.contains('on')) {
      sec.classList.toggle('search-empty', matchCount === 0);
    }
  });

  if (bar) {
    bar.classList.add('visible');
    bar.textContent = matchCount
      ? matchCount + ' question' + (matchCount === 1 ? '' : 's') + ' match "' + query + '"'
      : 'No matches for "' + query + '"';
  }
}
