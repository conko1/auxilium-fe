<template>
  <header id="header" class="au-header">
    <nav class="navbar navbar-expand-lg au-nav" aria-label="Hlavná navigácia">
      <div class="container">
        <router-link class="au-brand" :to="{ name: 'home' }" @click="onBrandClick">
          <span class="au-brand__mark" aria-hidden="true">
              <img src="@/assets/header_logo_small.png">
          </span>
          <span class="au-brand__text">
            <span class="au-brand__name">ZPS Auxilium</span>
            <span class="au-brand__tag">služby seniorom</span>
          </span>
        </router-link>

        <button
          class="navbar-toggler border-0 shadow-none px-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Otvoriť menu"
        >
          <i class="bi bi-list fs-1"></i>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav mx-lg-auto align-items-lg-center">
            <li class="nav-item dropdown" v-for="category in visibleCategories" :key="category.id">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                :id="`dd-${category.id}`"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click.prevent
              >{{ category.name }}</a>
              <ul class="dropdown-menu" :aria-labelledby="`dd-${category.id}`">
                <li v-for="content in categoryContents(category.id as number)" :key="content.id || content.href">
                  <button class="dropdown-item" type="button" @click="go(content.href as string)">
                    {{ content.link }}
                  </button>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                id="dd-vseobecne"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click.prevent
              >Všeobecné</a>
              <ul class="dropdown-menu" aria-labelledby="dd-vseobecne">
                <li v-for="item in generalLinks" :key="item.id">
                  <button class="dropdown-item" type="button" @click="go(item.id)">{{ item.label }}</button>
                </li>
              </ul>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <div class="au-admin-links d-flex align-items-center" v-if="logged">
              <router-link :to="{ name: 'gallery' }" title="Galéria" @click="closeMenu"><i class="bi bi-file-earmark-image"></i></router-link>
              <router-link :to="{ name: 'mail' }" title="Správy" @click="closeMenu"><i class="bi bi-envelope-paper"></i></router-link>
              <router-link :to="{ name: 'cloud' }" title="Dokumenty" @click="closeMenu"><i class="bi bi-file-earmark-text"></i></router-link>
              <router-link :to="{ name: 'settings' }" title="Nastavenia" @click="closeMenu"><i class="bi bi-gear"></i></router-link>
            </div>
            <a class="btn btn-primary" href="tel:+421415006029">
              <i class="bi bi-telephone me-2"></i>0918 666 410
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useContentsStore } from "@/store/contents-store";
import { Content } from "@/types/content-types";
import { scrollToId } from "@/utils/scroll";

const store = useContentsStore();
const { contents, categories, logged } = storeToRefs(store);

const generalLinks = [
  { id: "gallery-section", label: "Galéria" },
  { id: "faq-section", label: "Otázky" },
  { id: "formular", label: "Napíšte nám" },
  { id: "dokumenty", label: "Dokumenty" },
  { id: "cennik-sluzieb", label: "Cenník" },
  { id: "mapa", label: "Lokalita" },
  { id: "telefony", label: "Kontakt" },
];

function categoryContents(categoryId: number): Content[] {
  return contents.value.filter((c) => c.category === categoryId);
}

// Only categories that actually contain something are worth showing in the nav.
const visibleCategories = computed(() =>
  categories.value.filter((c) => categoryContents(c.id as number).length)
);

/**
 * Collapses the mobile menu (uses Bootstrap's own toggler, so no extra JS API needed).
 * Returns true when a menu was actually open.
 */
function closeMenu(): boolean {
  const nav = document.getElementById("mainNav");
  if (nav?.classList.contains("show")) {
    document.querySelector<HTMLElement>(".navbar-toggler")?.click();
    return true;
  }
  return false;
}

async function go(id: string) {
  // The sticky header shrinks while the menu collapses; scrolling before that
  // finishes would land in the wrong place, so wait for the animation (~350 ms).
  if (closeMenu()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  await scrollToId(id);
}

function onBrandClick() {
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
