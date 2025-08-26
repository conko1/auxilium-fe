<template>
  <div class="d-flex flex-1-1-auto container">
    <div v-if="store.loading" class="flex-wrap flex-1-1-auto d-flex justify-content-center align-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>

    <div v-else class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-3 sidebar">
          <h5 class="mt-4">Navigačné kategórie</h5>
          <div
            class="menu-item d-flex justify-content-between"
            v-for="(category, index) in categories"
            :key="index"
            @click="setActiveCategory(category)"
          >
            {{ category.name }}
            <i class="bi bi-trash3 d-none text-red h4 cursor-pointer" @click="removeCategory(category.id)"></i>
          </div>
          <div class="menu-item text-center" @click="addNewCategory">
            <i class="bi bi-plus-square h4"></i>
          </div>
        </div>

        <div class="col-12 col-md-9 p-4" v-if="activeCategory">
          <div class="d-flex justify-content-between mb-4">
            <h4 v-if="!editingCategory">{{ activeCategory.name }}</h4>
            <input v-else v-model="categoryDraft.name"  type="text" class="form-control w-75" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <div class="d-flex justify-content-center align-content-center">
              <i v-if="!editingCategory" class="bi bi-pencil-square cursor-pointer h4 me-2" @click="editCategory"/>
              <div v-else class="d-flex">
                <i class="bi bi-x-square h4 me-2 cursor-pointer" @click="editingCategory = false"></i>
                <i class="bi bi-save cursor-pointer h4 me-2" @click="saveCategory"/>
              </div>
            </div>
          </div>
          <div class="menu-item mb-2 d-flex justify-content-between" v-for="(content, index) in categoryContents()" :key="index">
            <input v-if="editingCategory" :value="content.link" @change="setContentLink($event, content.id)" type="text" class="form-control w-75" placeholder="Názov odseku">
            <span v-else>{{ content.link }}</span>
            <i class="bi bi-trash3 d-none text-red h4 cursor-pointer" @click="removeContent(content.id)"></i>
          </div>
          <p class="menu-item text-center pe-0" @click="addNewContent">
            <i class="bi bi-plus-square h4"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentsStore } from "@/store/contents-store";
import { storeToRefs } from "pinia";
import { Category, Content } from "@/types/content-types";
import {onMounted, ref} from "vue";

const store = useContentsStore();
const { contents, categories } = storeToRefs(store);

const activeCategory = ref<Category>(categories.value[0]);
const categoryDraft = ref<Category>({...activeCategory.value});

const contentDrafts = ref<Content[]>({...categoryContents()})

const editingCategory = ref(false);

function setContentLink(event: Event, id: number) {
  const input = event.target as HTMLInputElement;

  for (const contentDraft of Object.values(contentDrafts.value)) {
    if (contentDraft.id === id) {
      contentDraft.link = input.value;
    }
  }
}

function saveCategory() {
  if (categoryDraft.value.id) {
    store.patchCategory(categoryDraft.value.id, categoryDraft.value);
    activeCategory.value = categoryDraft.value;
  }
  editingCategory.value = false;

  for (const contentDraft of Object.values(contentDrafts.value)) {
    if (contentDraft.id) {
      store.patchContent(contentDraft.id, contentDraft);
    }
  }
}

function editCategory() {
  categoryDraft.value = {...activeCategory.value};
  contentDrafts.value = {...categoryContents()};
  editingCategory.value = true;
}

function removeContent(id: number) {
  store.removeContent(id);
}

function addNewContent() {
  editingCategory.value = false;

  const contentDraft: Content = {
    title: "Nový odsek",
    body: "Upravte obsah",
    category: activeCategory.value.id,
    link: "Nový odsek"
  };

  store.createContent(contentDraft);
}

function addNewCategory() {
  const categoryDraft: Category = {
    name: "Nová kategória"
  };

  store.createCategory(categoryDraft);
}

async function removeCategory(id: number) {
  await store.removeCategory(id);

  if (activeCategory.value.id === id) {
    activeCategory.value = categories.value[0];
  }
}

function setActiveCategory(category: Category) {
  activeCategory.value = category;
  editingCategory.value = false;
}

function categoryContents(): Content[] {
  if (!activeCategory.value) return [];
  return contents.value.filter((c) => c.category === activeCategory.value.id);
}

onMounted(() => {
  store.fetchAll();
})
</script>

<style scoped lang="scss">
.menu-item:hover {
  i {
    display: block !important;
  }
}

.h4 {
  margin-bottom: 0;
}
.flex-1-1-auto {
  flex: 1 1 auto;
}

.sidebar {
  border-right: 1px solid #ddd;
  height: 400px;

  @media (max-width: 767.98px) {
    height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}

.menu-item {
  padding: 10px 15px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f8f9fa;
}
</style>
