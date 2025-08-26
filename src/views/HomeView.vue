<template>
  <carousel/>
  <content-block v-for="(content, index) in contents" :key="index" :content="content" :odd="index % 2 !== 0"/>
  <fixed-content/>
</template>

<script setup lang="ts">
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";
import ContentBlock from "@/components/ContentBlock.vue";
import {onMounted} from "vue";
import FixedContent from "@/components/FixedContent.vue";
import Carousel from "@/components/Carousel.vue";

const store = useContentsStore();
const { contents } = storeToRefs(store);

onMounted(() => {
  store.fetchAll();
})
</script>
