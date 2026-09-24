<template>
  <!-- 01 / O nás -->
  <section id="o-nas" class="au-section">
    <div class="container">
      <div class="row gy-5 gx-lg-5 align-items-center">
        <div class="col-lg-6">
          <SectionHeading eyebrow="01 / O nás" title="Miesto, kde sa spomaľuje." />
          <p class="au-lead">
            Auxilium je zariadenie pre seniorov v pokojnom prostredí Varína. Naším poslaním je
            láskavý prístup a plnohodnotná starostlivosť o každého klienta.
          </p>
          <p>
            S ohľadom na vek, zdravotný stav a individuálne potreby podporujeme samostatnosť,
            spoločenský život a radosť z každého dňa.
          </p>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="au-stats">
            <div v-for="stat in stats" :key="stat.label">
              <span class="au-stat__num">{{ stat.value }}</span>
              <span class="au-stat__label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 02 / Naše služby -->
  <section id="sluzby" class="au-section au-section--alt">
    <div class="container">
      <SectionHeading eyebrow="02 / Naše služby" title="Starostlivosť, ktorá cítiť." />
      <p class="au-lead mb-5">Všetko, čo potrebujete pre pokojný a naplnený život pod jednou strechou.</p>
      <div class="row g-4">
        <div v-for="service in services" :key="service.num" class="col-md-6 col-lg-4">
          <article class="au-card">
            <span class="au-card__num">{{ service.num }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- 03 / Prijatie do zariadenia -->
  <section id="prijatie" class="au-section au-section--dark">
    <div class="container">
      <SectionHeading eyebrow="03 / Prijatie do zariadenia" title="Prvý krok k pokojnejšiemu zajtrajšku." />
      <div class="row g-4">
        <div v-for="step in steps" :key="step.num" class="col-md-4">
          <div class="au-step">
            <span class="au-step__num">{{ step.num }}</span>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/SectionHeading.vue";

const stats = [
  { value: "15+", label: "rokov skúseností" },
  { value: "24/7", label: "starostlivosť" },
  { value: "100%", label: "ľudský prístup" },
];

const services = [
  {
    num: "01",
    title: "Komplexná sociálna starostlivosť",
    text: "Sociálne poradenstvo, rehabilitácie a podpora samostatnosti v každodennom živote.",
  },
  {
    num: "02",
    title: "Opatrovateľská a zdravotná starostlivosť",
    text: "Bezpečná a citlivá pomoc pri odkázanosti na pomoc inej osoby — s rešpektom ku každému klientovi.",
  },
  {
    num: "03",
    title: "Aktívny a spoločenský život",
    text: "Kultúrne a záujmové činnosti, spoločné chvíle a priestor na radosť z každého dňa.",
  },
];

const steps = [
  { num: "01", text: "Požiadajte obec alebo mesto o posúdenie odkázanosti na sociálnu službu." },
  { num: "02", text: "Vyberte si naše zariadenie a podajte žiadosť o zabezpečenie sociálnej služby." },
  { num: "03", text: "Spoločne prejdeme všetky podmienky a dohodneme ďalší postup." },
];
</script>
