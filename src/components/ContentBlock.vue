<template>
  <div :id="contentData.href" class="py-3 pt-lg-6" data-bg-img="http://auxiliumno.sk/assets/img/backgrounds/bg-flickr_4182166296.jpg" :class="{'bg-light': odd}">
    <div class="container">
      <div class="d-flex">
        <div data-animate="fadeIn" data-animate-duration="0.8" class="w-100">
          <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
          <input v-if="editMode" v-model="contentData.title"  type="text" class="form-control w-75" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <h2 v-else class="text-center text-uppercase font-weight-bold my-0">
            {{ contentData.title }}
          </h2>
          <hr class="mb-3 w-50 mx-auto" />
        </div>
        <div v-if="logged">
          <div v-if="!editMode" class="cursor-pointer" @click="editMode = true">
            <i class="bi bi-pencil-square h4 ms-2"/>
          </div>
          <div v-else class="d-flex">
            <i class="bi bi-x-square h4 me-2 cursor-pointer" @click="discardChangesToContentBody"></i>
            <i class="bi bi-save h4 cursor-pointer" @click="saveChangesToContentBody"/>
          </div>
        </div>
      </div>
      <div class="user-select-none mb-2 d-flex justify-content-end" v-if="editMode">
          <div v-if="!dualMode" class="cursor-pointer" @click="setDualMode">
            <i class="bi bi-layout-split h4"></i>
          </div>
          <div v-else class="cursor-pointer" @click="setSingleMode(true)">
            <i class="bi bi-square h4"></i>
          </div>
      </div>
      <div v-if="!editMode" class="row ql-editor">
        <div v-if="!dualMode" v-html="contentBodyLeft" class="col-md-12"></div>
        <div v-else class="row">
          <div v-html="contentBodyLeft" class="col-md-6"></div>
          <div v-html="contentBodyRight" class="col-md-6"></div>
        </div>
      </div>
      <div v-else :class="{'two-col': dualMode}">
        <quill-editor v-model="contentBodyLeft" :koro="1" />
        <quill-editor v-if="dualMode" v-model="contentBodyRight" :koro="2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/quill/QuillEditor.vue";
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
  contentBodyLeft.value = joinColumns(contentBodyLeft.value, contentBodyRight.value, withMarker);
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

  console.log(L, R);

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
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>