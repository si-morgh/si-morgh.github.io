---
layout: page
title: Notes
---
<hr>


<ul>
  {% assign sorted_notes = site.data.notes | sort: 'year' | reverse %}
  {% for note in sorted_notes %}
    <li>
      <a href="{{ note.link }}">{{ note.title }}, {{ note.year }}</a><br>
      {% if note.notes %}
        <small>{{ note.notes }}</small>
      {% endif %}
    </li>
  {% endfor %}
</ul>