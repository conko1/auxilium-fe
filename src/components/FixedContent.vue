<template>
  <div id="content" class="p-0">
    <gallery-section />

    <faq-section/>
    <contact-form />

    <div id="dokumenty" class="container py-3 pt-lg-6 pb-lg-0">

      <div data-animate="fadeIn" data-animate-duration="0.4">
        <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
        <h2 class="text-center text-uppercase font-weight-bold my-0">
          Dokumenty
        </h2>
        <hr class="mb-3 w-50 mx-auto" />
      </div>

      <div class="row">
        <div class="col-md-12" data-animate="fadeIn" data-animate-delay="0.3" data-animate-offset="100%">
          <h4 class="mt-2 mb-2">Dokumenty</h4>
          <ul class="fa-ul list-unstyled">
            <li v-for="(file, index) in files" :key="index">
              <i class="bi bi-file-earmark me-2"></i>
              <a
                  :href="getFileUrl(file)"
                  :download="file.file_name"
                  class="text-primary bold"
              >
                {{ file.file_name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div id="cennik-sluzieb" class="bg-light py-3 py-lg-6">
      <div class="container">
        <div data-animate="fadeIn" data-animate-duration="0.6">
          <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
          <h2 class="text-center text-uppercase font-weight-bold my-0">
            Cenník služieb
          </h2>
          <hr class="mb-5 w-50 mx-auto" />
        </div>
        <div class="bg-op-1 bg-lime bg-shadow py-3 mt-4 text-center font-weight-bold" data-animate="fadeInUp" data-animate-duration="1.2" data-animate-offset="100%">
          <p class="d-inline-block py-1">
            <i class="fa fa-file-word-o"></i>Cenník služieb poskytovaných v zariadení pre seniorov Auxilium, n.o.
          </p>
          <p class="d-inline-block py-1">
            Bližšie informácie o výške úhrady za poskytovanú sociálnu službu v našom zariadení vám budú poskytnuté<br>telefonicky: 0915 729 127 alebo e-mailom: <a href="mailto:dss.socauxilium@gmail.com">dss.socauxilium@gmail.com</a>
          </p>
        </div>

      </div>
    </div>

    <p class="mb-20 h5"></p>

    <div id="mapa">
      <div class="container p-4 py-lg-5">
        <div data-animate="fadeIn" data-animate-duration="0.6">
          <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
          <h2 class="text-center text-uppercase font-weight-bold my-0">
            Kde nás nájdete
          </h2>
          <hr class="mb-4 w-50 mx-auto" />
          <p class="mt-2 mb-0">
            Zariadenie pre seniorov Auxilium sa nachádza v katastrálnom území obce Varín pri Žiline. Zariadenie je situované vedľa hlavnej cesty v obci a je veľmi dobre dostupné z dôležitých dopravných ťahov. V blízkosti sa nachádzajú zastávky pre hromadnú dopravu, obchody, lekárne, pošta, malé námestie a park, ktoré sú dostupné aj pešo 5 - 10 minút od zariadenia. Klienti, ale aj ich rodinní príslušníci, si môžu vychutnať prechádzku po obci Varín a obdivovať malé námestie a park, v ktorom si môžu aj posedieť.
          </p>
          <hr class="mb-4 w-50 mx-auto" />
        </div>

        <div class="row" data-animate="fadeIn" data-animate-delay="0.1">
          <div class="col-md-12 mb-5">
            <div class="google-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10427.270774260418!2d18.862707943309072!3d49.20401786821591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471450ab2b0b2d17%3A0xba20643848b82f5b!2sJozefa+Martin%C4%8Deka%2C+013+03+Var%C3%ADn!5e0!3m2!1ssk!2ssk!4v1516556726641" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
          <p>
            GPS: N 49° 12.246 E 018° 52.284 | <a rel="nofollow" href="geo:49.2041,18.8714">GEO: 49.2041,18.8714 <i class="fa fa-external-link"></i></a><br>
            Alternatívna mapa: <a href="https://www.openstreetmap.org/?mlat=49.2041&amp;mlon=18.8714#map=12/49.2041/18.8714" title="stránka OpenStreetMap v novom okne" target="_blank">
            OpenStreetMap <i class="fa fa-external-link"></i></a>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-light">
      <div id="telefony" class="container py-3">
        <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary">
        <h2 class="text-center text-uppercase font-weight-bold my-0">
          Kontaktujte nás
        </h2>
        <h5 class="text-center font-weight-light mt-2 mb-0 text-muted">
          V prípade akýchkoľvek otázok nás neváhajte kontaktovať emailom alebo telefonicky
        </h5>
        <hr class="mb-5 w-50 mx-auto">
        <div class="row text-center">

          <div class="col-lg-4 py-2">
            <i class="fa fa-user-circle icon-4x text-primary" data-animate-delay="0.1" style="animation-delay: 0.1s;"></i>
            <h4 class="mt-2">
              Riaditeľ
            </h4>
            <p>
              <a href="mailto:dss.auxilium@gmail.com">dss.auxilium@gmail.com</a><br>
              mobil: 0905 570 772
              <br>zástupca: 0907 803 863
            </p>
          </div>

          <div class="col-lg-4 py-2">
            <i class="fa fa-user icon-4x text-primary" data-animate-delay="0.2" style="animation-delay: 0.2s;"></i>
            <h4 class="mt-2">
              Sociálna pracovníčka
            </h4>
            <p>
              <a href="mailto:dss.socauxilium@gmail.com">dss.socauxilium@gmail.com</a><br>
              mobil: 0915 729 127<br>
              <strong>kancelária</strong><br>

              telefón: 041 / 500 60 29
            </p>
          </div>

          <div class="col-lg-4 py-2">
            <i class="fa fa-user-md icon-4x text-primary" data-animate-delay="0.3" style="animation-delay: 0.3s;"></i>
            <h4 class="mt-2">
              Vrchná sestra
            </h4>
            <p>
              <a href="mailto:dss.sestra.auxilium@gmail.com">dss.sestra.auxilium@gmail.com</a><br>
              telefón: 041 / 569 13 92<br>
              <strong>telefón po 15:00 hod.<br>na 24-hodinovú službu</strong>
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import FaqSection from "@/components/FaqSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import {useFilesStore} from "@/store/file-store";
import {storeToRefs} from "pinia";
import GallerySection from "@/components/GallerySection.vue";
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
</script>

<style scoped>

</style>