/**
 * Gallery carousel.
 *
 * Drives the full-viewport overlay rendered by _layouts/gallery.html:
 * previous/next buttons, arrow keys, touch swipe, and a live slide counter.
 * Replaces the two near-identical inline scripts that used to live in
 * gallery_1.html and gallery_2.html.
 */
(function () {
  'use strict';

  var overlay = document.getElementById('galleryOverlay');
  var slide = document.getElementById('carouselSlide');
  if (!overlay || !slide) return;

  var items = slide.querySelectorAll('.art-item');
  var total = items.length;
  if (total === 0) return;

  var nextBtn = document.getElementById('nextBtn');
  var prevBtn = document.getElementById('prevBtn');
  var closeBtn = document.getElementById('closeBtn');
  var counterDisplay = document.getElementById('image-counter');

  // Opening on slide 1 rather than 0 lets a gallery lead with a statement card
  // that the reader can swipe back to, without it blocking the artwork.
  var index = parseInt(overlay.dataset.startIndex, 10) || 0;
  if (index >= total) index = 0;

  function render() {
    slide.style.transform = 'translateX(' + -100 * index + '%)';
    if (counterDisplay) {
      counterDisplay.textContent = (index + 1) + ' / ' + total;
    }
    // The hint pulse on the forward button is only useful before the first move.
    if (nextBtn) nextBtn.classList.toggle('start-hint', index === 0);
  }

  function go(step) {
    index = (index + step + total) % total;
    render();
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });
  if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });

  // Touch swipe.
  var touchStartX = 0;
  var touchStartY = 0;

  slide.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  slide.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;
    // Ignore mostly-vertical gestures so scrolling a long statement card
    // does not flip the slide.
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  }, { passive: true });

  function close() {
    // Prefer returning to wherever the reader came from; fall back to the
    // gallery index when the page was opened directly or shared as a link.
    if (window.history.length > 1 && document.referrer) {
      window.history.back();
    } else {
      window.location.href = overlay.dataset.closeUrl || '/art/';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'Escape') close();
  });

  render();
}());
