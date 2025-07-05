---
layout: page
title: Talks
---

## Talks

<ul>
  {% assign sorted_talks = site.data.talks | sort: 'year' | reverse %}
  {% for talk in sorted_talks %}
    <li>
      <strong><a href="{{ talk.link }}">{{ talk.title }}</a></strong><br>
      {{ talk.place }}, {{ talk.year }}<br>
      {% if talk.notes %}
        <small>{{ talk.notes }}</small>
      {% endif %}
    </li>
  {% endfor %}
</ul>

