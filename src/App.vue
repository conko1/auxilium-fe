<template>
  <Header/>
  <router-view />
  <Footer/>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {onMounted} from "vue";
import {useContentsStore} from "@/store/contents-store";
import {refresh} from "@/services/auth-service";
import {storeToRefs} from "pinia";
import {useFilesStore} from "@/store/file-store";
import {useContactUsStore} from "@/store/contact-us-store";
import {useGalleryStore} from "@/store/gallery-store";

const contentStore = useContentsStore();
const fileStore = useFilesStore();
const contactUsStore = useContactUsStore();
const galleryStore = useGalleryStore();

onMounted(async () => {
  try {
    await refresh();

    contactUsStore.fetchAll();

    const store = useContentsStore();
    const { logged } = storeToRefs(store)
    logged.value = true;
  } finally {
    contentStore.fetchAll();
    fileStore.fetchAll();
    galleryStore.fetchAll();
  }
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<style scoped lang="scss">
.flex-1-1-auto {
  flex: 1 1 auto;
  flex-wrap: wrap;
}
</style>