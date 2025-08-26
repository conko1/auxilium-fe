<template>
  <div class="flex-1-1-auto container">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <h1 class="h4 mb-0">Nahraté fotky</h1>
      <i class="bi bi-file-earmark-arrow-up h4 cursor-pointer" @click="uploadFile"></i>
    </div>

    <ul class="list-group shadow-sm file-list my-3">
      <li
        class="list-group-item d-flex align-items-center gap-3 py-3 file-item"
        v-for="(file, index) in files"
        :key="index"
        role="button"
        @click="selectedImage = getFileUrl(file.file)"
      >
        <img
          :src="getFileUrl(file.file)"
          :alt="file.file_name"
          class="rounded"
          style="width:64px;height:64px;object-fit:cover;"
          data-bs-toggle="modal"
          data-bs-target="#photoModal"
        />
        <div class="flex-fill">
          <div class="fw-semibold text-truncate">{{ file.file_name }}</div>
        </div>

        <i
          class="bi bi-trash3 hover-icon text-red h4 cursor-pointer m-0"
          @click.stop="store.removeFile(file.id)"
          title="Delete"
        />
      </li>
    </ul>

    <div class="modal fade" id="photoModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="ratio ratio-16x9 bg-light">
              <img
                v-if="selectedImage"
                :src="selectedImage"
                alt="Selected photo large"
                class="img-fluid"
                style="object-fit:contain;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGalleryStore } from "@/store/gallery-store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import api from "@/services/config/api-config";

const store = useGalleryStore();
const { files } = storeToRefs(store);

const selectedImage = ref<string | null>(null);

async function uploadFile() {
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  inputEl.accept = "image/*";
  inputEl.onchange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    store.uploadFile(file);
  };
  inputEl.click();
}

function getFileUrl(path: string) {
  const baseUrl = api.defaults.baseURL;
  return new URL(path, baseUrl).toString();
}

onMounted(() => {
  store.fetchAll();
});
</script>

<style scoped lang="scss">
.list-group-item {
  .hover-icon { display: none !important; }
  &:hover { .hover-icon { display: block !important; } }
}
.flex-1-1-auto { flex: 1 1 auto; flex-wrap: wrap; }
</style>
