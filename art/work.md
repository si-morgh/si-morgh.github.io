---
layout: page            # Changed from default to page
title: Collection One
section: art
permalink: /art/collections/c1/  # Added for consistent routing
images:
  - file: 1.png
    title: "untitled, 2024; A6"
  - file: 2.png
    title: "untitled, 2024; A6"
  - file: 3.png
    title: "untitled, 2024; A6"
  - file: 4.png
    title: "untitled, 2024; A6"
  - file: 5.png
    title: "untitled, 2024; A6"
  - file: 6.png
    title: "untitled, 2024; A6"
  - file: 7.png
    title: "untitled, 2024; A6"
---

<div class="carousel-overlay" id="galleryOverlay">
  <button class="close-gallery" id="closeBtn" aria-label="Close Gallery">&times;</button>

  <div class="carousel-container">
    <div class="carousel-slide" id="carouselSlide">
      <div class="art-item statement-slide">
        <div class="statement-card">
          <p>{{ site.data.statements.c1.text }}</p>
        </div>
      </div>
      {% for img in page.images %}
        <div class="art-item">
          <img src="{{ '/assets/images/art/image-collections/image-c1/' | append: img.file | relative_url }}" alt="{{ img.title }}">
          <div class="art-caption">{{ img.title }}</div>
        </div>
      {% endfor %}
    </div>
    <div id="image-counter">1 / {{ page.images.size | plus: 1 }}</div>
    <button class="carousel-prev" id="prevBtn" aria-label="Backward">←</button>
    <button class="carousel-next start-hint" id="nextBtn" aria-label="Forward">→</button>
  </div>
</div>

<script>
  // Wrap in DOMContentLoaded to ensure elements are ready
  document.addEventListener('DOMContentLoaded', () => {
    const slide = document.getElementById('carouselSlide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const counterDisplay = document.getElementById('image-counter');
    const items = document.querySelectorAll('.art-item');
    const closeBtn = document.getElementById('closeBtn');

    let counter = 0;
    const total = items.length;

    function updateSlide() {
      if (!slide) return;
      slide.style.transform = `translateX(${-100 * counter}%)`;
      if (counterDisplay) {
        counterDisplay.innerText = `${counter + 1} / ${total}`;
      }
      if (counter > 0) {
        nextBtn.classList.remove('start-hint');
      } else {
        nextBtn.classList.add('start-hint');
      }
    }

    nextBtn.addEventListener('click', () => {
      counter = (counter >= total - 1) ? 0 : counter + 1;
      updateSlide();
    });

    prevBtn.addEventListener('click', () => {
      counter = (counter <= 0) ? total - 1 : counter - 1;
      updateSlide();
    });

    closeBtn.addEventListener('click', () => {
      // FIXED: Changed '/Art/collections/' to '/art/work/' to avoid 404
      window.location.href = "{{ '/art/work/' | relative_url }}"; 
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "Escape") closeBtn.click();
    });
  });
</script>