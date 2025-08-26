<template>
  <div class="d-flex flex-column">
    <div ref="quillToolbar" class="ql-toolbar ql-snow">
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-link"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-header">
          <option selected></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
        </select>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
    </div>

    <div ref="quillEditor"></div>

    <LinkPickerModal
      v-if="showLinkModal"
      :options="linkOptions"
      @select="onModalSelect"
      @cancel="onModalCancel"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch, computed} from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import LinkPickerModal, { LinkOptions } from "@/components/LinkPickerModal.vue";
import {useFilesStore} from "@/store/file-store";
import {storeToRefs} from "pinia";
import api from "@/services/config/api-config";

const fileStore = useFilesStore();
const { files } = storeToRefs(fileStore);

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const quillToolbar = ref<HTMLDivElement | null>(null);
const quillEditor = ref<HTMLDivElement | null>(null);
let quill: Quill | null = null;

const showLinkModal = ref(false);

let resolveLink: ((value: string | null) => void) | null = null;

const linkOptions = computed(() : LinkOptions[] => {
  return Object.values(files.value).map((f) => {
    const baseUrl = api.defaults.baseURL;
    const serverFileNameWithExtension = f.file.split("/").reverse()[0];
    const serverFileNameWithoutExtension = serverFileNameWithExtension.split(".")[0];
    const path = `/files/${serverFileNameWithoutExtension}/${f.file_name}`
    const url = new URL(path, baseUrl).toString();

    return {
      url,
      name: f.file_name
    };
  });
});

function pickLink(): Promise<string | null> {
  showLinkModal.value = true;
  return new Promise((resolve) => {
    resolveLink = resolve;
  });
}

function onModalSelect(value: string) {
  showLinkModal.value = false;
  resolveLink?.(value);
  resolveLink = null;
}
function onModalCancel() {
  showLinkModal.value = false;
  resolveLink?.(null);
  resolveLink = null;
}

const formats = ["bold", "italic", "underline", "link", "header", "list", "indent"];

async function linkHandler(this: any, value: boolean) {
  const q = this.quill as Quill;
  const range = q.getSelection(true);
  if (!range) return;

  if (!value) {
    q.format("link", false);
    return;
  }

  const picked = await pickLink();
  if (!picked) return;

  let url = picked.trim();

  q.format("link", url);
}

function initEditors(): void {
  quill = new Quill(quillEditor.value as HTMLDivElement, {
    theme: "snow",
    modules: {
      toolbar: {
        container: quillToolbar.value as HTMLDivElement,
        handlers: { link: linkHandler },
      },
    },
    formats,
  });

  setHtmlInEditor(props.modelValue);

  quill.on("text-change", () => {
    emit("update:modelValue", (quill as Quill).root.innerHTML);
  });
}

watch(() => props.modelValue, (v) => setHtmlInEditor(v));

function setHtmlInEditor(htmlToSet: string) {
  if (!quill) return;
  const current = (quill.root.innerHTML || "").trim();
  const incoming = (htmlToSet || "").trim();
  if (current === incoming) return;
  quill.clipboard.dangerouslyPasteHTML(htmlToSet, "silent");
}

onMounted(() => initEditors());
onBeforeUnmount(() => (quill = null));

</script>

<style scoped>
.ql-editor ol { padding-left: 0; }
.ql-editor .ql-indent-1:not(.ql-direction-rtl) { padding-left: 1em !important; }
.ql-editor .ql-indent-2:not(.ql-direction-rtl) { padding-left: 2em !important; }
.ql-editor .ql-indent-3:not(.ql-direction-rtl) { padding-left: 3em !important; }
.ql-editor .ql-indent-4:not(.ql-direction-rtl) { padding-left: 4em !important; }
.ql-editor .ql-indent-5:not(.ql-direction-rtl) { padding-left: 5em !important; }
.ql-editor .ql-indent-6:not(.ql-direction-rtl) { padding-left: 6em !important; }
.ql-editor .ql-indent-7:not(.ql-direction-rtl) { padding-left: 7em !important; }
.ql-editor .ql-indent-8:not(.ql-direction-rtl) { padding-left: 8em !important; }
.ql-editor li.ql-indent-1:not(.ql-direction-rtl) { padding-left: 2.5em !important; }
.ql-editor li.ql-indent-2:not(.ql-direction-rtl) { padding-left: 3.5em !important; }
.ql-editor li.ql-indent-3:not(.ql-direction-rtl) { padding-left: 4.5em !important; }
.ql-editor li.ql-indent-4:not(.ql-direction-rtl) { padding-left: 5.5em !important; }
.ql-editor li.ql-indent-5:not(.ql-direction-rtl) { padding-left: 6.5em !important; }
.ql-editor li.ql-indent-6:not(.ql-direction-rtl) { padding-left: 7.5em !important; }
.ql-editor li.ql-indent-7:not(.ql-direction-rtl) { padding-left: 8.5em !important; }
.ql-editor li.ql-indent-8:not(.ql-direction-rtl) { padding-left: 9.5em !important; }
</style>
