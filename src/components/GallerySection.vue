<template>
  <section v-if="slides.length" id="gallery-section" class="au-section au-section--alt">
    <div class="container">
      <SectionHeading eyebrow="Fotografie" title="Galéria" />

      <div
        id="galleryCarousel"
        class="carousel slide carousel-fade au-gallery"
        data-bs-ride="carousel"
        data-bs-touch="true"
        data-bs-pause="hover"
        data-bs-interval="8000"
      >
        <div class="carousel-inner">
          <div
            v-for="(slide, index) in slides"
            :key="slide.src"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img
              :src="slide.src"
              :alt="`Fotografia ${index + 1} z ${slides.length}`"
              loading="lazy"
              @click="openFullscreen(index)"
            />
          </div>
        </div>

        <div class="carousel-indicators">
          <button
            v-for="(s, i) in slides"
            :key="'ind-' + i"
            type="button"
            data-bs-target="#galleryCarousel"
            :data-bs-slide-to="i"
            :class="{ active: i === 0 }"
            :aria-current="i === 0 ? 'true' : undefined"
            :aria-label="`Fotografia ${i + 1}`"
          ></button>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Predchádzajúca</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Ďalšia</span>
        </button>
      </div>
    </div>
  </section>

  <FullScreenCarousel
    v-if="showFullscreen"
    :urls="slides.map(s => s.src)"
    :startIndex="fullscreenIndex"
    @click.self="closeFullscreen"
    @close="showFullscreen = false"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useGalleryStore } from "@/store/gallery-store";
import { storeToRefs } from "pinia";
import api from "@/services/config/api-config";
import FullScreenCarousel from "@/components/FullScreenCarousel.vue";
import SectionHeading from "@/components/SectionHeading.vue";

const store = useGalleryStore();
const { files } = storeToRefs(store);

const slides = computed(() => {
  const baseUrl = api.defaults.baseURL;
  return files.value.map((f) => ({
    src: `${new URL(f.file, baseUrl)}`
  }));
});

// Fullscreen state
const showFullscreen = ref(false);
const fullscreenIndex = ref(0);

function openFullscreen(index) {
  fullscreenIndex.value = index;
  showFullscreen.value = true;
}

function closeFullscreen() {
  showFullscreen.value = false;
}
</script>
