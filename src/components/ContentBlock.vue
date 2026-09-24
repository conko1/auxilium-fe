<template>
  <section :id="contentData.href" class="au-section" :class="{'au-section--alt': odd}">
    <div class="container">
      <div class="d-flex align-items-start justify-content-between gap-3">
        <div class="flex-grow-1">
          <div v-if="editMode" class="au-section__head">
            <input
              v-model="contentData.title"
              type="text"
              class="form-control form-control-lg"
              aria-label="Názov sekcie"
              placeholder="Názov sekcie"
            >
          </div>
          <SectionHeading v-else :title="contentData.title" />
        </div>

        <div v-if="logged" class="pt-2 flex-shrink-0">
          <div v-if="!editMode" class="cursor-pointer" title="Upraviť" @click="editMode = true">
            <i class="bi bi-pencil-square h4"/>
          </div>
          <div v-else class="d-flex gap-3">
            <i class="bi bi-x-square h4 cursor-pointer" title="Zahodiť zmeny" @click="discardChangesToContentBody"></i>
            <i class="bi bi-save h4 cursor-pointer" title="Uložiť" @click="saveChangesToContentBody"/>
          </div>
        </div>
      </div>

      <div class="user-select-none mb-2 d-flex justify-content-end" v-if="editMode">
        <div v-if="!dualMode" class="cursor-pointer" title="Dva stĺpce" @click="setDualMode">
          <i class="bi bi-layout-split h4"></i>
        </div>
        <div v-else class="cursor-pointer" title="Jeden stĺpec" @click="setSingleMode(true)">
          <i class="bi bi-square h4"></i>
        </div>
      </div>

      <!-- .ql-editor is required so Quill's list/indent/align styles keep working -->
      <div v-if="!editMode" class="ql-editor au-prose">
        <div v-if="!dualMode" v-html="contentBodyLeft" class="au-prose__col"></div>
        <div v-else class="row g-4 g-lg-5">
          <div v-html="contentBodyLeft" class="col-md-6 au-prose__col"></div>
          <div v-html="contentBodyRight" class="col-md-6 au-prose__col"></div>
        </div>
      </div>
      <div v-else :class="{'two-col': dualMode}">
        <quill-editor v-model="contentBodyLeft" :koro="1" />
        <quill-editor v-if="dualMode" v-model="contentBodyRight" :koro="2" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/quill/QuillEditor.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import {Content} from "@/types/content-types";
import {onMounted, ref} from "vue";
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";

const store = useContentsStore();
const { logged } = storeToRefs(store);

onMounted(() => {
  initContentBody();
});

const props = defineProps<{ content: Content, odd: boolean }>();

const contentData = ref<Content>({...props.content});

const contentBodyLeft = ref<string>("");
const contentBodyRight = ref<string>("");

const dualMode = ref(false);

const editMode = ref(false);

function discardChangesToContentBody() {
  contentData.value = {...props.content};
  initContentBody();
  editMode.value = false;
}

function initContentBody() {
  const contentBody = props.content.body;

  if (!contentBody) {
    return;
  }

  const contentBodySplit = splitColumns(contentBody);

  if (contentBodySplit.left !== '') {
    contentBodyLeft.value = contentBodySplit.left;

    if (contentBodySplit.found) {
      contentBodyRight.value = contentBodySplit.right;
      dualMode.value = true;
    }
  }
}

function saveChangesToContentBody() {
  if (dualMode.value) {
    contentData.value.body = joinColumns(contentBodyLeft.value, contentBodyRight.value, true);
    splitData(contentData.value.body);
  } else {
    contentData.value.body = contentBodyLeft.value;
  }

  if (contentData.value.id) {
    store.patchContent(contentData.value.id, contentData.value);
  }

  editMode.value = false;
}

function setDualMode() {
  splitData(contentBodyLeft.value);
  dualMode.value = true;
}

function splitData(data: string) {
  const contentBodySplit = splitColumns(data);

  contentBodyLeft.value = contentBodySplit.left;
  contentBodyRight.value = contentBodySplit.right;
}

function setSingleMode(withMarker: boolean) {
  if (withMarker && contentBodyRight.value) {
    contentBodyLeft.value = joinColumns(contentBodyLeft.value, contentBodyRight.value, withMarker);
  } else {
    contentBodyLeft.value = joinColumns(contentBodyLeft.value, contentBodyRight.value, false);
  }
  dualMode.value = false;
}

const DEFAULT_SPLIT_MARKER = '<splitblock></splitblock>';

function splitColumns(html: string, marker: string = DEFAULT_SPLIT_MARKER)
  : { left: string; right: string; found: boolean }
{
  if (!html) return { left: '', right: '', found: false };

  const idx = html.indexOf(marker);
  if (idx === -1) {
    return { left: html, right: '', found: false };
  }

  const left = html.slice(0, idx).replace(/\n?\s*$/, '');
  const right = html.slice(idx + marker.length).replace(/^\s*\n?/, '');

  return { left, right, found: true };
}

function joinColumns(left: string, right: string, withMarker: boolean, marker: string = DEFAULT_SPLIT_MARKER)
  : string
{
  const safe = (s: string) => (s ?? '');

  let L = safe(left);
  let R = safe(right);

  if (!withMarker) {
    const leftTrim = L.replace(/\s+$/, '');
    const rightTrim = R.replace(/^\s+/, '');
    return leftTrim + (leftTrim && rightTrim ? '\n' : '') + rightTrim;
  }
  const leftTrim = L.replace(/\s+$/, '');
  const rightTrim = R.replace(/^\s+/, '');

  return `${leftTrim}${marker}${rightTrim}`;
}
</script>

<style scoped lang="scss">
.au-prose__col :deep(h4) {
  margin-top: 0 !important;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>