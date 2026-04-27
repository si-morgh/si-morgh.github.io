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