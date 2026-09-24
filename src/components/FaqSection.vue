<template>
  <section id="faq-section" class="au-section">
    <div class="container">
      <div class="row gy-5 gx-lg-5">
        <div class="col-lg-4">
          <SectionHeading eyebrow="Najčastejšie" title="Časté otázky a odpovede" />
        </div>
        <div class="col-lg-8">
          <div class="accordion accordion-flush au-accordion" id="faqAccordion">
            <div class="accordion-item" v-for="(faq, index) in faqs" :key="faq.id">
              <h3 class="accordion-header">
                <button
                  class="accordion-button"
                  :class="{ collapsed: index !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#faq' + faq.id"
                  :aria-expanded="index === 0 ? 'true' : 'false'"
                  :aria-controls="'faq' + faq.id"
                >
                  {{ faq.question }}
                </button>
              </h3>
              <div
                :id="'faq' + faq.id"
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body" v-html="faq.answer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/SectionHeading.vue";

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
