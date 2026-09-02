---
layout: null
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="description" content="Mathematics and art by {{ site.author.name }}.">
  <meta name="google-site-verification" content="rlCtbokrufpUGXl8ntYhhu1Haf8oUHj22ppf3shksHQ">
  <title>Mathematics &amp; Art &middot; {{ site.author.name }}</title>
  <link rel="icon" href="{{ '/favicon.ico' | relative_url }}" sizes="any">
  <link rel="canonical" href="{{ '/' | absolute_url }}">
  <link rel="stylesheet" href="{{ '/assets/css/slider.css' | relative_url }}">
  <link rel="preload" as="image" href="{{ '/assets/images/me.webp' | relative_url }}">
</head>

<body>

<h1 class="visually-hidden">{{ site.author.name }} &mdash; mathematics and art</h1>

<div class="split-wrapper">
  <div class="section side-m" role="presentation"></div>
  <div class="section side-a" role="presentation"></div>
  <div class="line-hint" role="presentation"></div>

  <div class="floating-text art-hint" aria-hidden="true">Art</div>
  <div class="floating-text math-hint" aria-hidden="true">Mathematics</div>

  <div class="slider-container">
    <input type="range" min="0" max="100" value="50" step="1"
           class="gate-slider" id="gateSlider"
           aria-label="Drag left for mathematics, right for art">
  </div>

  <!-- Works with no JavaScript, no pointer, and no sight. -->
  <ul class="gate-links">
    <li><a href="{{ '/math/' | relative_url }}">Mathematics</a></li>
    <li><a href="{{ '/art/' | relative_url }}">Art</a></li>
  </ul>
</div>

<style>
  /* Only rule that must be inline: it hides the heading before slider.css
     arrives, so the page never flashes stray text over the image. */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
</style>

<script>
  (function () {
    'use strict';

    var slider = document.getElementById('gateSlider');
    if (!slider) return;

    var root = document.documentElement;
    var mathUrl = {{ '/math/' | relative_url | jsonify }};
    var artUrl = {{ '/art/' | relative_url | jsonify }};

    var OPEN_LEFT = 5;    // drag this far left and the maths side opens
    var OPEN_RIGHT = 95;  // this far right and the art side opens
    var HINT_AT = 0.5;    // resting opacity of the hints while dragging

    var interacting = false;
    var navigating = false;
    var ticking = false;

    function paint(value) {
      var distanceFromCentre = Math.abs(50 - value);

      // Each hint fades in as the handle travels towards its own side, and
      // sits at a low resting opacity while the handle is held.
      var towardsArt = value > 60 ? (value - 60) / 30 : (interacting ? HINT_AT : 0);
      var towardsMath = value < 40 ? (40 - value) / 20 : (interacting ? HINT_AT : 0);

      root.style.setProperty('--split', value + '%');
      root.style.setProperty('--split-num', value);
      root.style.setProperty('--dynamic-opacity', 0.8 + distanceFromCentre / 100);
      root.style.setProperty('--art-hint-opacity', Math.min(towardsArt, 1));
      root.style.setProperty('--math-hint-opacity', Math.min(towardsMath, 1));
      root.style.setProperty('--line-hint-opacity', interacting ? 0.4 : 0);

      if (navigating) return;
      if (value <= OPEN_LEFT) {
        navigating = true;
        window.location.href = mathUrl;
      } else if (value >= OPEN_RIGHT) {
        navigating = true;
        window.location.href = artUrl;
      }
    }

    function schedulePaint(value) {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        paint(value);
        ticking = false;
      });
    }

    function snapToMiddle() {
      var start = parseFloat(slider.value);
      var startTime = performance.now();
      var DURATION = 400;

      // Honour the reduced-motion preference rather than animating regardless.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        slider.value = 50;
        paint(50);
        return;
      }

      (function step(now) {
        var progress = Math.min((now - startTime) / DURATION, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = start + (50 - start) * eased;
        slider.value = value;
        paint(value);
        if (progress < 1) window.requestAnimationFrame(step);
      }(startTime));
    }

    slider.addEventListener('pointerdown', function () {
      interacting = true;
      paint(parseFloat(slider.value));
    });

    slider.addEventListener('input', function (e) {
      schedulePaint(parseFloat(e.target.value));
    });

    // Keyboard use gets the same reveal without needing a pointer press.
    slider.addEventListener('focus', function () {
      interacting = true;
      paint(parseFloat(slider.value));
    });

    slider.addEventListener('blur', function () {
      interacting = false;
      paint(parseFloat(slider.value));
    });

    window.addEventListener('pointerup', function () {
      if (!interacting) return;
      interacting = false;
      var value = parseFloat(slider.value);
      if (value > OPEN_LEFT && value < OPEN_RIGHT) snapToMiddle();
    });

    slider.value = 50;
    paint(50);
  }());
</script>

</body>
</html>
