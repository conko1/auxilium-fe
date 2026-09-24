<template>
  <main>
    <hero-section/>
    <content-block v-for="(content, index) in contents" :key="content.id ?? index" :content="content" :odd="index % 2 !== 0"/>
    <fixed-content/>
  </main>
</template>

<script setup lang="ts">
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";
import ContentBlock from "@/components/ContentBlock.vue";
import {onMounted} from "vue";
import FixedContent from "@/components/FixedContent.vue";
import HeroSection from "@/components/HeroSection.vue";
import IntroSections from "@/components/IntroSections.vue";

const store = useContentsStore();
const { contents } = storeToRefs(store);

onMounted(() => {
  store.fetchAll();
})
</script>
