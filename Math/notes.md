---
layout: page
title: notes
permalink: math/notes/
section: math
# One note title contains \(\Delta\), so this page opts in to KaTeX.
math: true
---

<hr>

<ul class="link-list">
  {% assign sorted_notes = site.data.notes | sort: "year" | reverse %}
  {% for note in sorted_notes %}
    <li>
      <a href="{{ note.link | relative_url }}" class="link-list__title" target="_blank" rel="noopener">
        {{ note.title }}{% if note.year %}, {{ note.year }}{% endif %}
      </a>
      {% if note.notes and note.notes != "" %}
        <span class="link-list__note">{{ note.notes }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>
