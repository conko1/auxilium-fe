<template>
  <div
    class="card-accordion container p-4 py-lg-5"
    id="faq-section"
    role="tablist"
    aria-multiselectable="true"
    data-animate="fadeIn"
    data-animate-duration="0.4"
  >
    <div data-animate="fadeIn" data-animate-duration="0.2">
      <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
      <h2 class="text-center text-uppercase font-weight-bold my-0">
        Časté otázky a odpovede
      </h2>
      <hr class="mb-3 w-50 mx-auto" />
    </div>

    <div class="card" v-for="(faq, index) in faqs" :key="faq.id">
      <h4
        class="card-header d-flex justify-content-between align-items-center p-3 text-primary"
        role="tab"
        :id="'heading' + faq.id"
        data-bs-toggle="collapse"
        data-bs-parent="#accordion"
        :data-bs-target="'#collapse' + faq.id"
        :aria-expanded="index === 0 ? 'true' : 'false'"
        :aria-controls="'collapse' + faq.id"
        style="cursor: pointer;"
      >
        <span>{{ faq.question }}</span>
        <i class="bi bi-app"></i>
      </h4>

      <div
        :id="'collapse' + faq.id"
        :class="['collapse', { show: index === 0 }]"
        role="tabpanel"
        :aria-labelledby="'heading' + faq.id"
        data-bs-parent="#accordion"
      >
      <div class="card-body" v-html="faq.answer"></div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    id: 1,
    question:
      "Je pobyt klienta v zariadení pre seniorov Auxilium časovo obmedzený?",
    answer:
      "Každý klient si môže sám zvoliť dĺžku svojho pobytu v našom zariadení."
  },
  {
    id: 2,
    question:
      "Ako je v zariadení pre seniorov Auxilium zabezpečená strava, sú zohľadňované diétne požiadavky klienta?",
    answer:
      "V našom zariadení sa strava podáva 5x denne ( raňajky, desiata, obed, olovrant, večera ) a je pripravovaná so zreteľom na individuálne potreby každého klienta. Strava je podávaná v jedálni, ktorá je bezbariérová. Ak zdravotný stav klienta vyžaduje donášku na izbu, strava je podávaná na izbe."
  },
  {
    id: 3,
    question: "Aké sú návštevné hodiny v zariadení?",
    answer:
      "V našom zariadení nie sú vyhradené návštevné hodiny. Naši klienti môžu byť navštevovaní kedykoľvek počas celého roka alebo po predchádzajúcej dohode s pracovníkmi zariadenia pre seniorov Auxilium."
  },
  {
    id: 4,
    question: "Môže si klient zariadiť izbu vlastným nábytkom?",
    answer:
      "Naše zariadenie poskytuje svojim klientom úplne zariadené izby, ale malé kusy vlastného nábytku (napríklad kreslo či obrazy) si klienti samozrejme môžu priniesť so sebou."
  },
  {
    id: 5,
    question:
      "Aké sú možnosti trávenia voľného času v zariadení pre seniorov Auxilium?",
    answer: `
            Na prácu s klientmi nám slúži spoločná jedáleň, kde každý deň s klientmi pracujeme a realizujeme spoločenské aktivity a hry a to formou:
            <ul>
              <li>Ergoterapie - drobné práce, výzdoba interiéru a starostlivosť o exteriér zariadenia, práca v záhrade, starostlivosť o kvetiny a čistotu záhrady,</li>
              <li>Muzikoterapie a arteterapie - počúvanie hudby a tvorba dekorácií a maľovanie,</li>
              <li>Výletov do blízkeho okolia – park a námestie vo Varíne</li>
              <li>Pamäťových cvičení - hranie hier pre rozvoj pamäti, krížovky a osemsmerovky,</li>
              <li>Akcii pre seniorov - besedy, oslavy narodenín a sviatkov...</li>
            </ul>
          `
  }
]
</script>

<style scoped>
.text-primary {
  color: #4b6901 !important;
}
</style>