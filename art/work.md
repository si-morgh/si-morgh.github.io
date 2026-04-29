---
layout: page
title: Untitled
permalink: /art/work/
section: art
---
<div class="carousel-overlay" id="galleryOverlay" style="z-index: 9999;">
  
  <button class="close-gallery" style="z-index: 100000; cursor: pointer;" onclick="window.location.href='{{ '/art/work/' | relative_url }}'">&times;</button>
  <button class="carousel-prev" style="z-index: 100000; cursor: pointer;" onclick="moveSlide(-1)">←</button>
  <button class="carousel-next start-hint" style="z-index: 100000; cursor: pointer;" onclick="moveSlide(1)">→</button>
  <div id="image-counter" style="z-index: 100000;"></div>

  <div class="carousel-container">
    <div class="carousel-slide" id="carouselSlide" style="display: flex; height: 100%; transition: transform 0.5s ease-in-out;">
      <div class="art-item statement-slide" style="flex: 0 0 100%; min-width: 100%;">
        <div class="statement-card">
          <p>{{ site.data.statements.c1.text }}</p>
        </div>
      </div>
      {% for item in site.data.galleries.c1 %}
        <div class="art-item" style="flex: 0 0 100%; min-width: 100%;">
          <img src="{{ item.image | relative_url }}" alt="{{ item.title }}">
          <div class="art-caption">{{ item.title }}</div>
        </div>
      {% endfor %}
    </div>
  </div>
</div>

<script>
  // 1. Setup Variables
  var counter = 0;
  var slide = document.getElementById('carouselSlide');
  var items = document.querySelectorAll('.art-item');
  var total = items.length;
  var counterDisplay = document.getElementById('image-counter');
  var nextBtn = document.querySelector('.carousel-next');

  // 2. Set Initial Counter Text
  if(counterDisplay) {
    counterDisplay.innerText = "1 / " + total;
  }

  // 3. The Unbreakable Move Function
  window.moveSlide = function(step) {
    counter = counter + step;
    
    // Loop back to start or end
    if (counter >= total) {
      counter = 0;
    } else if (counter < 0) {
      counter = total - 1;
    }

    // Physically move the slide
    slide.style.transform = "translateX(" + (-100 * counter) + "%)";
    
    // Update the numbers
    if(counterDisplay) {
      counterDisplay.innerText = (counter + 1) + " / " + total;
    }
    
    // Turn off the glowing effect on the right arrow
    if (counter > 0 && nextBtn) {
      nextBtn.classList.remove('start-hint');
    }
  };

  // 4. Keyboard Controls
  document.addEventListener('keydown', function(e) {
    if (e.key === "ArrowLeft") moveSlide(-1);
    if (e.key === "ArrowRight") moveSlide(1);
    if (e.key === "Escape") window.location.href = "{{ '/art/work/' | relative_url }}";
  });
</script>