<template>
  <div id="content">
    <gallery-section />
    <faq-section />
    <contact-form />

    <!-- Dokumenty -->
    <section id="dokumenty" class="au-section">
      <div class="container">
        <SectionHeading eyebrow="Na stiahnutie" title="Dokumenty" />
        <div v-if="files.length" class="row g-3">
          <div v-for="(file, index) in files" :key="file.id ?? index" class="col-md-6">
            <a :href="getFileUrl(file)" :download="file.file_name" class="au-doc">
              <i class="bi" :class="fileIcon(file.file_name)"></i>
              <span class="text-break">{{ file.file_name }}</span>
              <i class="bi bi-download"></i>
            </a>
          </div>
        </div>
        <p v-else class="text-secondary mb-0">Momentálne tu nie sú žiadne dokumenty.</p>
      </div>
    </section>

    <!-- Cenník -->
    <section id="cennik-sluzieb" class="au-section au-section--alt">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <SectionHeading eyebrow="Cenník" title="Cenník služieb" />
            <div class="au-form-card">
              <p class="fs-5 mb-3">
                Cenník služieb poskytovaných v zariadení pre seniorov Auxilium, n.o.
              </p>
              <p class="text-secondary">
                Bližšie informácie o výške úhrady za poskytovanú sociálnu službu v našom zariadení vám
                budú poskytnuté telefonicky alebo e-mailom.
              </p>
              <div class="d-flex flex-wrap gap-3 mt-4">
                <a class="btn btn-primary" href="tel:+421918666410"><i class="bi bi-telephone me-2"></i>0918 666 410</a>
                <a class="btn btn-outline-primary" href="mailto:zpsauxilium@gmail.com"><i class="bi bi-envelope me-2"></i>zpsauxilium@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mapa -->
    <section id="mapa" class="au-section">
      <div class="container">
        <div class="row gy-5 gx-lg-5 align-items-center">
          <div class="col-lg-5">
            <SectionHeading eyebrow="Lokalita" title="Kde nás nájdete" />
            <p>
              Zariadenie pre seniorov Auxilium sa nachádza v katastrálnom území obce Varín pri Žiline.
              Zariadenie je situované vedľa hlavnej cesty v obci a je veľmi dobre dostupné z dôležitých
              dopravných ťahov. V blízkosti sa nachádzajú zastávky pre hromadnú dopravu, obchody, lekárne,
              pošta, malé námestie a park, ktoré sú dostupné aj pešo 5 - 10 minút od zariadenia. Klienti,
              ale aj ich rodinní príslušníci, si môžu vychutnať prechádzku po obci Varín a obdivovať malé
              námestie a park, v ktorom si môžu aj posedieť.
            </p>
            <p class="small text-secondary mb-0">
              GPS: N 49° 12.246 E 018° 52.284 ·
              <a rel="nofollow" href="geo:49.2041,18.8714">49.2041, 18.8714</a><br>
              Alternatívna mapa:
              <a href="https://www.openstreetmap.org/?mlat=49.2041&amp;mlon=18.8714#map=12/49.2041/18.8714" target="_blank" rel="noopener">OpenStreetMap <i class="bi bi-box-arrow-up-right small"></i></a>
            </p>
          </div>
          <div class="col-lg-7">
            <div class="au-map ratio ratio-4x3">
              <iframe
                title="Mapa — Zariadenie pre seniorov Auxilium, Varín"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10427.270774260418!2d18.862707943309072!3d49.20401786821591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471450ab2b0b2d17%3A0xba20643848b82f5b!2sJozefa+Martin%C4%8Deka%2C+013+03+Var%C3%ADn!5e0!3m2!1ssk!2ssk!4v1516556726641"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Kontakty -->
    <section id="telefony" class="au-section au-section--alt">
      <div class="container">
        <SectionHeading eyebrow="Kontakt" title="Kontaktujte nás" />
        <p class="au-lead mb-5">V prípade akýchkoľvek otázok nás neváhajte kontaktovať emailom alebo telefonicky.</p>
        <div class="row g-4">
          <div class="col-lg-4">
            <article class="au-card au-contact-card">
              <div class="au-icon"><i class="bi bi-person-badge"></i></div>
              <h3>Riaditeľ</h3>
              <ul>
                <li><a href="mailto:zpsauxilium@gmail.com">zpsauxilium@gmail.com</a></li>
                <li>mobil: <a href="tel:+421905570772">0918 666 410</a></li>
              </ul>
            </article>
          </div>
          <div class="col-lg-4">
            <article class="au-card au-contact-card">
              <div class="au-icon"><i class="bi bi-people"></i></div>
              <h3>Sociálna pracovníčka</h3>
              <ul>
                <li><a href="mailto:dss.socauxilium@gmail.com">dss.socauxilium@gmail.com</a></li>
                <li>mobil: <a href="tel:+421915729127">0915 729 127</a></li>
                <li>kancelária: <a href="tel:+421415006029">0918 666 410</a></li>
              </ul>
            </article>
          </div>
          <div class="col-lg-4">
            <article class="au-card au-contact-card">
              <div class="au-icon"><i class="bi bi-heart-pulse"></i></div>
              <h3>Vrchná sestra</h3>
              <ul>
                <li><a href="mailto:dss.sestra.auxilium@gmail.com">dss.sestra.auxilium@gmail.com</a></li>
                <li>telefón: <a href="tel:+421415691392">041 / 569 13 92</a></li>
                <li><small>telefón po 15:00 hod. na 24-hodinovú službu</small></li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FaqSection from "@/components/FaqSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import {useFilesStore} from "@/store/file-store";
import {storeToRefs} from "pinia";
import GallerySection from "@/components/GallerySection.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import api from "@/services/config/api-config";
import {UploadedFile} from "@/types/file-types";

const filesStore = useFilesStore();
const { files } = storeToRefs(filesStore);

function getFileUrl(file: UploadedFile): string {
  const baseUrl = api.defaults.baseURL;
  const serverFileNameWithExtension = file.file.split("/").reverse()[0];
  const serverFileNameWithoutExtension = serverFileNameWithExtension.split(".")[0];
  const path = `/files/${serverFileNameWithoutExtension}/${file.file_name}`
  return new window.URL(path, baseUrl).toString();
}

function fileIcon(name: string): string {
  const ext = (name.split(".").pop() || "").toLowerCase();
  const known = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "zip"];
  if (ext === "doc") return "bi-filetype-doc";
  return known.includes(ext) ? `bi-filetype-${ext}` : "bi-file-earmark";
}
</script>
