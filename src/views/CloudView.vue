<template>
  <div class="flex-1-1-auto container">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <h1 class="h4 mb-0">Nahraté súbory</h1>
      <i class="bi bi-file-earmark-arrow-up h4 cursor-pointer" @click="uploadFile"></i>
    </div>

    <ul class="list-group shadow-sm file-list my-3">
      <li class="list-group-item d-flex align-items-center gap-3 py-3 file-item" v-for="(file, index) in files" :key="index">
        <span v-if="file.file.includes('docx')" class="file-icon fs-4"><i class="bi bi-filetype-docx align-items-center flex-wrap text-blue"></i></span>
        <span v-else-if="file.file.includes('pdf')" class="file-icon fs-4"><i class="bi bi-filetype-pdf align-items-center flex-wrap text-red"></i></span>
        <div class="flex-grow-1">
          <div class="fw-semibold">
            <span v-if="!fileEditing" class="cursor-pointer" @click="downloadFile(file)">{{ file.file_name }}</span>
            <input v-else :value="file.file_name" @change="setFileName" type="text" class="form-control w-75" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Názov súboru">
          </div>
        </div>
        <div class="file-actions d-flex align-items-center gap-2">
          <i v-if="!fileEditing" class="bi bi-pencil-square h4 m-0 cursor-pointer" @click="setFileEdit(file)"></i>
          <i v-else class="bi bi-save h4 cursor-pointer mb-0" @click="saveFile"/>
          <i class="bi bi-trash3 text-red h4 m-0 cursor-pointer" @click="removeFile(file.id)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useFilesStore} from "@/store/file-store";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {UploadedFile} from "@/types/file-types";
import {onMounted} from "vue";
import api from "@/services/config/api-config";

const store = useFilesStore();
const {files} = storeToRefs(store);

const fileEditing = ref(false);
const fileDraft = ref<UploadedFile>({...files.value[0]});

async function downloadFile(file: UploadedFile) {
  const baseUrl = api.defaults.baseURL;
  const url = new URL(file.file, baseUrl);
  const res = await fetch(url.toString(), {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  }

  const blob = await res.blob();

  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = file.file_name;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(objectUrl);
}

function setFileName(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.value.includes(".docx")) {
    fileDraft.value.file_name = input.value;
  } else {
    fileDraft.value.file_name = input.value + ".docx";
  }
}

function saveFile() {
  if (fileDraft.value?.id){
    const fd = new FormData();
    fd.append("file_name", fileDraft.value.file_name);
    store.renameFile(fileDraft.value.id, fd);
    fileEditing.value = false;
  }
}

function setFileEdit(file: UploadedFile) {
  fileEditing.value = true;
  fileDraft.value = {...file};
}

function removeFile(id: number) {
  store.removeFile(id);
}

async function uploadFile() {
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  inputEl.accept =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf";
  inputEl.onchange = (event: Event) => {
      const input = event.target as HTMLInputElement;

      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      store.uploadFile(file);
  };
  inputEl.click();
}

onMounted(() => {
  store.fetchAll();
})
</script>

<style scoped lang="scss">
.file-item {
  .file-actions {
    display: none !important;
  }

  &:hover {
    .file-actions {
      display: flex !important;
    }
  }
}
.flex-1-1-auto {
  flex: 1 1 auto;
  flex-wrap: wrap;
}
</style>