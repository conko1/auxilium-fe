<template>
  <div id="highlighted" class="bg-black">
    <div
      id="heroCarousel"
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
          data-bs-target="#heroCarousel"
          :data-bs-slide-to="i"
          :class="{ active: i === 0 }"
          :aria-current="i === 0 ? 'true' : undefined"
          :aria-label="`Slide ${i + 1}`"
        ></button>
      </div>

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
            :alt="slide.alt || ('Slide ' + (index + 1))"
            loading="lazy"
            :style="{ objectFit }"
          />

          <!-- Optional overlays -->
          <div class="position-absolute top-0 start-0 w-100 h-100 overlay-dark"></div>
          <div class="position-absolute top-0 start-0 w-100 h-100 overlay-gradient"></div>

          <!-- Caption -->
          <div class="carousel-caption d-md-block mb-4 caption-bottom">
            <p class="text-white p-4 bg-primary bg-opacity-50 fw-semibold" v-html="slide.caption"></p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props (configurable height & object-fit behavior)
const props = defineProps({
  height: { type: String, default: "60vh" },   // e.g., "420px" or "60vh"
  objectFit: { type: String, default: "cover" } // "cover" or "contain"
});

// Local reactive references to props for template binding
const height = props.height;
const objectFit = props.objectFit;

// Images & captions come from this variable:
const slides = ref([
  {
    src: require("@/assets/slide1.jpg"),
    alt: "Slide 1",
    caption: "<strong>Láska nepozná starobu<br>a srdce nepozná vrásky.</strong>"
  },
  {
    src: require("@/assets/slide2.jpg"),
    alt: "Slide 2",
    caption: "<strong>Oni, ktorých nazývame starými,<br>boli v skutočnosti vo všetkom noví.</strong>"
  },
  {
    src: require("@/assets/slide3.jpg"),
    alt: "Slide 3",
    caption: "<strong>Kde je láska, tam niet starostí.<br>A ak predsa sú, prijímajú sa s láskou.</strong>"
  },
  {
    src: require("@/assets/slide4.jpg"),
    alt: "Slide 4",
    caption: "<strong>Ničoho sa staroba nesmie<br>vystríhať väčšmi ako nečinnosti</strong>"
  }
]);
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
