---
layout: page
title: research
section: math
---

<style>
  .research-profiles {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin: 15px 0 30px 0;
  }
  .research-profiles a {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #333;
    font-size: 0.95rem;
    transition: opacity 0.2s;
  }
  .research-profiles a:hover {
    opacity: 0.7;
  }
  .research-profiles img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
  .research-section {
    margin-bottom: 25px;
  }
  .research-section h3 {
    margin-bottom: 8px;
    font-size: 1.1rem;
    text-transform: lowercase;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
  .publications-container {
    margin-top: 30px;
  }
</style>

<hr>

<div class="research-profiles">
  <a href="http://arxiv.org/a/mohammadpour_r_1" target="_blank">
    <img src="{{ '/assets/images/icons/arxiv.png' | relative_url }}" alt="ArXiv"> ArXiv
  </a>
  <a href="https://zbmath.org/authors/?ml=3&ml-1-f=any&ml-1-v=&ml-1-op=and&ml-2-f=ln&ml-2-v=mohammadpour&ml-2-op=and&ml-3-f=fn&ml-3-v=rahman" target="_blank">
    <img src="{{ '/assets/images/icons/zbmath.svg' | relative_url }}" alt="zbMATH"> zbMATH
  </a>
  <a href="https://orcid.org/0000-0003-4562-4178" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg" alt="ORCID"> ORCID
  </a>
  <a href="https://mathscinet.ams.org/mathscinet/author?authorId=1240707" target="_blank">
    <img src="https://mathscinet.ams.org/favicon.ico" alt="MathSciNet"> MathSciNet
  </a>
  <a href="https://mathoverflow.net/users/38866/rahman-m" target="_blank">
    <img src="https://cdn.sstatic.net/Sites/mathoverflow/Img/favicon.ico" alt="MathOverflow"> MathOverflow
  </a>
</div>

<div class="research-section">
  <h3>mathematical research areas</h3>
  <p>Martin's Maximum (MM), Proper Forcing Axiom (PFA), forcing with models as side conditions, iterated forcing, trees.</p>
</div>

<div class="research-section">
  <h3>other interests</h3>
  <p>Inner model theory, Axioms of Determinacy, iterated ultrapower constructions.</p>
</div>

<div class="publications-container">
  <h3>publications</h3>
  {% bibliography --nocite %}
</div>