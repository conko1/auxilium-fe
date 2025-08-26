<template>
  <div class="bg-light" id="gallery-section">
    <div class="container p-4 py-lg-5 ">
      <div data-animate="fadeIn" data-animate-duration="0.2">
        <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
        <h2 class="text-center text-uppercase font-weight-bold my-0">
          Galéria
        </h2>
        <hr class="mb-3 w-50 mx-auto" />
      </div>


      <div
        id="galleryCarousel"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-touch="true"
        data-bs-pause="hover"
        :data-bs-interval="10000"
      >
        <div class="carousel-indicators">
          <button
            v-for="(s, i) in slides"
            :key="'ind-' + i"
            type="button"
            data-bs-target="#galleryCarousel"
            :data-bs-slide-to="i"
            :class="{ active: i === 0 }"
            :aria-current="i === 0 ? 'true' : undefined"
            :aria-label="`Slide ${i + 1}`"
          ></button>
        </div>

        <!-- Slides -->
        <div class="carousel-inner" :style="{ height }">
          <div
            v-for="(slide, index) in slides"
            :key="slide.src"
            class="carousel-item position-relative"
            :class="{ active: index === 0 }"
            :style="{ height }"
          >
            <img
              class="d-block w-100 h-100"
              :src="slide.src"
              loading="lazy"
              :style="{ objectFit }"
            />

            <div class="position-absolute top-0 start-0 w-100 h-100 overlay-dark"></div>
            <div class="position-absolute top-0 start-0 w-100 h-100 overlay-gradient"></div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useGalleryStore} from "@/store/gallery-store";
import {storeToRefs} from "pinia";
import api from "@/services/config/api-config";

const props = defineProps({
  height: { type: String, default: "50vh" },
  objectFit: { type: String, default: "cover" }
});

const height = props.height;
const objectFit = props.objectFit;

const store = useGalleryStore();
const { files } = storeToRefs(store);


const slides = computed(() => {
  const baseUrl = api.defaults.baseURL;

  return files.value.map((f) => {
    return {
      src: `${new URL(f.file, baseUrl)}`,
    }
  })
});
</script>

<style scoped>
/* Overlays for the dark/gradient feel */
.overlay-dark {
  background: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}
.overlay-gradient {
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0.35) 70%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

/* Keep caption near the bottom like your original */
.caption-bottom {
  bottom: 2rem;
}

/* Indicators readable on dark bg */
.carousel-indicators [data-bs-target] {
  background-color: #fff;
  opacity: 0.6;
}
.carousel-indicators .active {
  opacity: 1;
}
</style>
