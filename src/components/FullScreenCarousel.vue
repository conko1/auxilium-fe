<template>
  <div
    class="carousel"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="counter" v-if="count > 0">
      {{ currentIndex + 1 }} / {{ count }}
    </div>

    <div class="slides">
      <transition v-if="currentUrl" name="slide" mode="out-in">
        <img
          :key="currentUrl"
          class="slide-image"
          :src="currentUrl"
          :alt="`Slide ${currentIndex + 1}`"
          draggable="false"
        />
      </transition>
      <div v-else class="empty">No images</div>
    </div>

    <button class="nav prev" @click="prev" aria-label="Previous image">‹</button>
    <button class="nav next" @click="next" aria-label="Next image">›</button>
    <div class="text-end me-5">
      <i class="bi bi-x-lg text-white h4 cursor-pointer close-button" @click="$emit('close')"></i>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  urls: {
    type: Array,
    required: true,
    validator: (arr) => Array.isArray(arr) && arr.every((u) => typeof u === "string"),
  },
  startIndex: {
    type: Number,
    default: 0,
  },
});

const currentIndex = ref(0);
const touchStartX = ref(null);

const count = computed(() => props.urls?.length ?? 0);
const currentUrl = computed(() => (count.value ? props.urls[currentIndex.value] : null));

onMounted(() => {
  if (count.value > 0) {
    const c = count.value;
    currentIndex.value = ((props.startIndex % c) + c) % c;
  }

  const el = document.querySelector(".carousel");
  el && el.focus && el.focus();
});

function next() {
  if (!count.value) return;
  currentIndex.value = (currentIndex.value + 1) % count.value;
}

function prev() {
  if (!count.value) return;
  currentIndex.value = (currentIndex.value - 1 + count.value) % count.value;
}

function onTouchStart(e) {
  touchStartX.value = e.changedTouches[0].clientX;
}

function onTouchEnd(e) {
  if (touchStartX.value === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX.value;
  const threshold = 40;
  if (dx > threshold) prev();
  else if (dx < -threshold) next();
  touchStartX.value = null;
}
</script>

<style scoped lang="scss">
.close-button {
  position: absolute;
}

:host, .carousel {
  z-index: 9999999 !important;
  display: block;
  width: 100vw;
  height: 100vh;
}

.carousel {
  position: fixed;
  inset: 0;
  background: #000;
  overflow: hidden;
  user-select: none;
  outline: none;
}

.counter {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.55);
  color: #fff;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 14px;
  letter-spacing: 0.3px;
  z-index: 3;
}

.slides {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.slide-image {
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;
  pointer-events: none;
}

.empty {
  color: #888;
  font-size: 14px;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  z-index: 3;
  display: grid;
  place-items: center;
  transition: background 0.2s ease;
}

.nav:hover { background: rgba(0,0,0,0.65); }
.nav.prev { left: 16px; }
.nav.next { right: 16px; }

.slide-enter-active,
.slide-leave-active {
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
}
.slide-enter-from { opacity: 0; transform: translateX(12px); }
.slide-leave-to   { opacity: 0; transform: translateX(-12px); }

@media (max-width: 480px) {
  .nav {
    width: 44px;
    height: 44px;
    font-size: 28px;
  }
  .counter {
    font-size: 12px;
    padding: 4px 10px;
  }
}
</style>
