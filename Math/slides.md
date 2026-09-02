---
layout: page
title: slides
permalink: math/slides/
section: math
---

<hr>

<ul class="link-list">
  {% assign sorted_talks = site.data.talks | sort: "year" | reverse %}
  {% for talk in sorted_talks %}
    <li>
      <a href="{{ talk.link | relative_url }}" class="link-list__title" target="_blank" rel="noopener">
        {{ talk.title }}
      </a>
      <span class="link-list__meta">
        {{ talk.place }}{% if talk.year %}, {{ talk.year }}{% endif %}
      </span>
      {% if talk.notes %}
        <span class="link-list__note">{{ talk.notes }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>
