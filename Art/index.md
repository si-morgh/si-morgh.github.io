---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: page
title: Bio
section: art
---

<script>
  const slide = document.getElementById('carouselSlide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const items = document.querySelectorAll('.art-item');

  let counter = 0;

  nextBtn.addEventListener('click', () => {
    if (counter >= items.length - 1) {
      counter = -1; // Loops back to the first image
    }
    counter++;
    slide.style.transform = `translateX(${-100 * counter}%)`;
  });

  prevBtn.addEventListener('click', () => {
    if (counter <= 0) {
      counter = items.length; // Loops to the last image
    }
    counter--;
    slide.style.transform = `translateX(${-100 * counter}%)`;
  });
</script>

<script>
  const slide = document.getElementById('carouselSlide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const items = document.querySelectorAll('.art-item');

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

  // Optional: Allow arrow keys to navigate
  document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
</script>