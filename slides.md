---
layout: page
title: slides
---
<hr>
<ul>
  {% assign sorted_talks = site.data.talks | sort: 'year' | reverse %}
  {% for talk in sorted_talks %}
    <li>
      <a href="{{ talk.link }}">{{ talk.title }}</a><br>
      {{ talk.place }}, {{ talk.year }}<br>
      {% if talk.notes %}
        <small>{{ talk.notes }}</small>
      {% endif %}
    </li>
  {% endfor %}
</ul>

