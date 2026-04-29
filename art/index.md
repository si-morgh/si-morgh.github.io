---
layout: page
title: Bio
permalink: /art/
section: art
---

My name is Rahman.

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const slide = document.getElementById('carouselSlide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const items = document.querySelectorAll('.art-item');

    if (!slide || !nextBtn || !prevBtn) return;

    let counter = 0;

    function updateSlide() {
      slide.style.transform = `translateX(${-100 * counter}%)`;
    }

    nextBtn.addEventListener('click', () => {
      counter = (counter >= items.length - 1) ? 0 : counter + 1;
      updateSlide();
    });

    prevBtn.addEventListener('click', () => {
      counter = (counter <= 0) ? items.length - 1 : counter - 1;
      updateSlide();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });
  });
</script>
