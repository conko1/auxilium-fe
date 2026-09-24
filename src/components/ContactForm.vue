<template>
  <section id="formular" class="au-section au-section--alt">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-xl-8">
          <SectionHeading eyebrow="Kontakt" title="Napíšte nám správu" />

          <div class="au-form-card">
            <div v-if="finished">
              <div v-if="!error" class="alert alert-success" role="status">Formulár bol úspešne odoslaný.</div>
              <div v-else class="alert alert-danger" role="alert">Nepodarilo sa odoslať formulár.</div>
            </div>

            <form id="contact-form" @submit.prevent="createContactUs">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input v-model="recipientName" type="text" class="form-control" id="contact-name" placeholder="Vaše meno a priezvisko" autocomplete="name" required>
                    <label for="contact-name">Vaše meno a priezvisko</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input v-model="email" type="email" class="form-control" id="contact-email" placeholder="Váš email" autocomplete="email" required>
                    <label for="contact-email">Váš email</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea v-model="body" class="form-control" id="contact-message" placeholder="Vaša správa" style="height: 10rem" required></textarea>
                    <label for="contact-message">Vaša správa</label>
                  </div>
                </div>
                <div class="col-12">
                  <button v-if="!loading" type="submit" class="btn btn-primary btn-lg">
                    Poslať správu <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                  <div v-else class="spinner-border text-primary" role="status"><span class="visually-hidden">Odosielam…</span></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ContactUs} from "@/types/contact-us-types";
import {useContactUsStore} from "@/store/contact-us-store";
import SectionHeading from "@/components/SectionHeading.vue";

const contactUsStore = useContactUsStore();

const loading = ref(false);

const finished = ref(false);
const error = ref(false);


const recipientName = ref("");
const email = ref("");
const body = ref("");

async function createContactUs () {
  const contactUs: ContactUs = {
    email: email.value,
    body: body.value,
    recipient_name: recipientName.value
  }

  finished.value = false;
  loading.value = true;

  await contactUsStore.createContactUs(contactUs);

  error.value = !!contactUsStore.error;

  loading.value = false;
  finished.value = true;
}
</script>

<style scoped>

</style>