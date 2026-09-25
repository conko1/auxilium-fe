<template>
  <section id="domov" class="au-hero">
    <!-- Tip: download this photo into src/assets and import it instead of hot-linking. -->
    <img
      class="au-hero__img"
      :src="heroImage"
      alt="Seniori pri spoločnom rozhovore"
      fetchpriority="high"
    />

    <div class="container">
      <p class="au-eyebrow au-eyebrow--light">Domov, ktorý má srdce</p>
      <h1>Dôstojný život. <em>Každý deň.</em></h1>
      <p class="lead">
        Vytvárame bezpečné a láskavé prostredie, v ktorom sa seniori cítia ako doma.
        S úctou k príbehu každého človeka.
      </p>
      <div class="d-flex flex-wrap gap-3">
        <a class="btn btn-light btn-lg" href="#formular" @click.prevent="scrollToId('formular')">Kontaktujte nás</a>
        <a class="btn btn-outline-light btn-lg" href="#bf011f60-a739-4606-b153-867c0a8110d9" @click.prevent="scrollToId('bf011f60-a739-4606-b153-867c0a8110d9')">Spoznajte Auxilium</a>
      </div>
    </div>

    <div class="au-hero__quote">
      <div class="container">
        <div
          id="heroQuotes"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="7000"
          data-bs-pause="false"
        >
          <div class="carousel-inner">
            <div
              v-for="(quote, i) in quotes"
              :key="i"
              class="carousel-item"
              :class="{ active: i === 0 }"
            >
              <blockquote>„{{ quote }}“</blockquote>
            </div>
          </div>
          <div class="carousel-indicators">
            <button
              v-for="(quote, i) in quotes"
              :key="'i' + i"
              type="button"
              data-bs-target="#heroQuotes"
              :data-bs-slide-to="i"
              :class="{ active: i === 0 }"
              :aria-current="i === 0 ? 'true' : undefined"
              :aria-label="`Citát ${i + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { scrollToId } from "@/utils/scroll";

const heroImage =
  "https://images.unsplash.com/photo-1543333995-a78aea2eee50?auto=format&fit=crop&w=2200&q=85";

const quotes = [
  "Láska nepozná starobu a srdce nepozná vrásky.",
  "Oni, ktorých nazývame starými, boli v skutočnosti vo všetkom noví.",
  "Kde je láska, tam niet starostí. A ak predsa sú, prijímajú sa s láskou.",
  "Ničoho sa staroba nesmie vystríhať väčšmi ako nečinnosti.",
];
</script>
