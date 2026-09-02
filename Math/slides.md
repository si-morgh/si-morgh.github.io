---
layout: page
title: slides
permalink: math/slides/
section: math
---

<hr>

{%- comment -%}
  Indentation is kept under four spaces throughout: kramdown treats a
  deeper-indented line inside a page as a code block.
{%- endcomment -%}
<ul class="link-list">
{%- assign sorted_talks = site.data.talks | sort: "year" | reverse -%}
{%- for talk in sorted_talks %}
 <li>
 <a href="{{ talk.link | relative_url }}" class="link-list__title" target="_blank" rel="noopener">{{ talk.title }}</a>
 {%- if talk.size %}<span class="link-list__size">PDF, {{ talk.size }}</span>{% endif %}
 <span class="link-list__meta">{{ talk.place }}{% if talk.year %}, {{ talk.year }}{% endif %}</span>
 {%- if talk.notes and talk.notes != "" %}
 <span class="link-list__note">{{ talk.notes }}</span>
 {%- endif %}
 </li>
{%- endfor %}
</ul>
