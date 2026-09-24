<template>
  <div class="au-section__head" :class="{ 'text-center': center }">
    <p v-if="eyebrow" class="au-eyebrow">{{ eyebrow }}</p>
    <h2 class="au-h2">
      {{ head ? head + " " : "" }}<em v-if="tail">{{ tail }}</em>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Section title in the Auxilium style: the last word is set in italic serif
 * ("Miesto, kde sa *spomaľuje.*"). Works for CMS titles too.
 */
const props = defineProps<{ title: string | null; eyebrow?: string; center?: boolean }>();

const words = computed(() => (props.title ?? "").trim().split(/\s+/).filter(Boolean));
const head = computed(() => words.value.slice(0, -1).join(" "));
const tail = computed(() => words.value.slice(-1)[0] ?? "");
</script>
