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
function moveSlide(collectionId, direction) {
  const container = document.querySelector(`#carousel-${collectionId} .carousel-slide`);
  const items = container.querySelectorAll('.art-piece');
  
  // Get current transform value or default to 0
  let currentTransform = parseFloat(container.style.getPropertyValue('--offset') || 0);
  
  // Calculate new position
  let newIndex = Math.round(Math.abs(currentTransform / 100)) + direction;
  
  // Boundary check
  if (newIndex >= 0 && newIndex < items.length) {
    let offset = newIndex * -100;
    container.style.setProperty('--offset', offset);
    container.style.transform = `translateX(${offset}%)`;
  }
}
</script>