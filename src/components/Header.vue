<template>
  <div id="header">
    <div data-toggle="sticky">

      <div class="header bg-logo">
        <div class="header-inner container">

          <div class="header-brand">
            <router-link class="header-brand-text" :to="{name: 'home'}">
              <img src="@/assets/header_logo.png">
            </router-link>
          </div>

          <div class="header-block order-12 mt-3">
            <div class="flex-column text-right d-none d-lg-flex mr-2">
              <h1 class="my-0 mb-1 h5">
                Auxilium, n.o.
              </h1>
              <h2 class="my-0 mb-1 h5">
                Jozefa Martinčeka 108/50, 013 03 Varín
              </h2>
              <h6 class="my-0 mb-1">

                <a href="tel:00421415006029" class="text-primary"><i class="fa fa-phone-square fa-lg"></i> 041 / 500 60 29</a>
              </h6>
              <h6 class="my-0 mb-1">
                <a href="mailto:dss.auxilium@gmail.com" class="text-primary"><i class="fa fa-envelope fa-lg"></i> dss.auxilium@gmail.com</a>
              </h6>
            </div>
            <a href="#top" class="btn btn-link btn-icon header-btn float-right d-lg-none mt-5" data-toggle="jpanel-menu" data-target=".navbar-main" data-direction="right"> <i class="fa fa-bars fa-lg"></i> </a>
          </div>

        </div>
      </div>

      <div class="navbar navbar-expand-md">
        <div class="navbar-main bg-primary navbar-dark">
          <div class="nav navbar-nav container pt-4 pb-4 d-flex justify-content-between">

            <div class="d-flex flex-row">
              <div class="dropdown me-4 align-content-center"
                   v-for="category in categories"
                   :key="category.id">
                <template v-if="categoryContents(category.id).length">
                  <a
                    class="dropdown-toggle text-white text-decoration-none"
                    href="#"
                    role="button"
                    :id="`dd-${category.id}`"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ category.name }}
                  </a>

                  <ul class="dropdown-menu pos-absolute" :aria-labelledby="`dd-${category.id}`">
                    <li v-for="content in categoryContents(category.id)" :key="content.id || content.href">
                      <button class="dropdown-item" type="button" @click="scrollTo(content.href)">
                        {{ content.link }}
                      </button>
                    </li>
                  </ul>
                </template>

                <template v-else>
                  <span class="text-white text-decoration-none">
                    {{ category.name }}
                  </span>
                </template>
              </div>

              <div class="dropdown me-4 align-content-center">
                  <a
                    class="dropdown-toggle text-white text-decoration-none"
                    href="#"
                    role="button"
                    :id="`dd-vseobecne`"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Všeobecné
                  </a>

                  <ul class="dropdown-menu" :aria-labelledby="`dd-vseobecne`">
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('gallery-section')">
                        Galéria
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('faq-section')">
                        Otázky
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('formular')">
                        Napíšte nám
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('dokumenty')">
                        Dokumenty
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('cennik-sluzieb')">
                        Cenník
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('mapa')">
                        Lokalita
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="scrollTo('telefony')">
                        Kontakt
                      </button>
                    </li>
                  </ul>
              </div>
            </div>

            <div class="dropdown align-content-center cursor-pointer" v-if="logged">
              <router-link class="text-lime me-2" :to="{name: 'gallery'}" data-toggle="scroll-link"><i class="bi bi-file-earmark-image text-white h4"></i></router-link>
              <router-link class="text-lime me-2" :to="{name: 'mail'}" data-toggle="scroll-link"><i class="bi bi-envelope-paper text-white h4"></i></router-link>
              <router-link class="text-lime me-2" :to="{name: 'cloud'}" data-toggle="scroll-link"><i class="bi bi-file-earmark-text text-white h4"></i></router-link>
              <router-link class="text-lime" :to="{name: 'settings'}" data-toggle="scroll-link"><i class="bi bi-gear text-white h4"></i></router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";
import {Content} from "@/types/content-types";
import router from "@/router";

const store = useContentsStore();
const { contents, categories, logged } = storeToRefs(store);

function categoryContents(categoryId: number) : Content[] {
  return contents.value.filter((c) => c.category === categoryId);
}

async function scrollTo(id: string) {
  const currentPathName = router.currentRoute.value.name;
  if (currentPathName !== "home") {
    await router.push({name: "home"})
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style scoped>

</style>