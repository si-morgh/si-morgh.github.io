---
layout: page
title: notes
permalink: math/notes/
section: math
---

<style>
  .notes-list {
    list-style-type: none;
    padding-left: 0;
    margin-top: 20px;
  }
  .notes-list li {
    margin-bottom: 18px;
    line-height: 1.4;
  }
  .note-link {
    font-weight: 500;
    text-decoration: none;
    color: #0056b3;
  }
  .note-link:hover {
    text-decoration: underline;
  }
  .note-meta {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-top: 2px;
  }
</style>

<hr>

<ul class="notes-list">
  {% assign sorted_notes = site.data.notes | sort: "year" | reverse %}
  {% for note in sorted_notes %}
    <li>
      <a href="{{ note.link | relative_url }}" class="note-link" target="_blank">
        {{ note.title }}{% if note.year %}, {{ note.year }}{% endif %}
      </a>
      {% if note.notes %}
        <span class="note-meta">{{ note.notes }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>