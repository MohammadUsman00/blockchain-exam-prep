/**
 * App bootstrap — wires modular scripts together.
 * Load order: mock-questions.js → tracker-topics.js → theme → nav → quiz → mock → tracker → search → app.js
 */
(function boot() {
  initTheme();
  initBackToTop();
  buildMock();
  buildTracker();
})();
