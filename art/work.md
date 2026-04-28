---
layout: page        # Changed from default to page
title: Collections
permalink: /art/work/ # Added trailing slash
section: art
---
<div class="collection-grid">
  <a href="{{ '/art/collections/c1/' | relative_url }}" class="collection-box">
    <div class="thumb-container">
      <img src="{{ '/assets/images/art/image-collections/image-c1/1.png' | relative_url }}" class="collection-thumb">
      <div class="thumb-overlay">
        <div class="overlay-text">
          <p>{{ site.data.statements.c1.text | truncate: 100 }}</p>
        </div>
      </div>
    </div>
    <div class="collection-info">
      <h3 class="collection-title">Ink on paper, 2024</h3>
    </div>
  </a>
</div>