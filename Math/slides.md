---
layout: page
title: slides
permalink: math/slides/
section: math
---

<style>
  .talks-list {
    list-style-type: none;
    padding-left: 0;
    margin-top: 20px;
  }
  .talks-list li {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .talk-link {
    font-weight: 600;
    text-decoration: none;
    color: #0056b3;
    font-size: 1.05rem;
  }
  .talk-link:hover {
    text-decoration: underline;
  }
  .talk-meta {
    display: block;
    color: #555;
    font-size: 0.95rem;
    margin-top: 3px;
  }
  .talk-note {
    display: block;
    color: #888;
    font-size: 0.85rem;
    font-style: italic;
    margin-top: 2px;
  }
</style>

<hr>

<ul class="talks-list">
  {% assign sorted_talks = site.data.talks | sort: "year" | reverse %}
  {% for talk in sorted_talks %}
    <li>
      <a href="{{ talk.link | relative_url }}" class="talk-link" target="_blank">
        {{ talk.title }}
      </a>
      <span class="talk-meta">
        {{ talk.place }}{% if talk.year %}, {{ talk.year }}{% endif %}
      </span>
      {% if talk.notes %}
        <span class="talk-note">{{ talk.notes }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>