<template>
  <div id="formular" class="bg-light">
    <div class="container p-4 py-lg-5">

      <div data-animate="fadeIn" data-animate-duration="0.3">
        <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
        <h2 class="text-center text-uppercase font-weight-bold my-0">
          Napíšte nám správu
        </h2>
        <hr class="mb-4 w-50 mx-auto" />
        <div v-if="finished">
          <div v-if="!error" class="alert alert-success">Formulár bol úspešne odoslaný.</div>
          <div v-else class="alert alert-danger">Nepodarilo sa odoslať formulár.</div>
        </div>
      </div>

      <form id="contact-form" @submit.prevent="createContactUs">

        <div class="row">
          <div class="col-md-6">
            <div class="form-group" data-animate="fadeInDown" data-animate-delay="0.2">
              <label class="sr-only" for="contact-name">Priezvisko</label>
              <input v-model="recipientName" type="text" class="form-control" id="contact-name" placeholder="Vaše meno a priezvisko" required="required">
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group" data-animate="fadeInDown" data-animate-delay="0.2">
              <label class="sr-only" for="contact-email">Email</label>
              <input v-model="email" type="email" class="form-control" id="contact-email" placeholder="Váš email" required="required">
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12 text-center">
            <div class="form-group" data-animate="fadeInDown" data-animate-delay="0.4">
              <label class="sr-only" for="contact-message">Správa</label>
              <textarea v-model="body" rows="6" class="form-control" id="contact-message" placeholder="Vaša správa" required="required"></textarea>
              <button v-if="!loading" type="submit" class="btn btn-outline-primary btn-lg mt-3">Poslať správu</button>
              <div v-else class="spinner-border mt-3" role="status"></div>
            </div>
          </div>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ContactUs} from "@/types/contact-us-types";
import {useContactUsStore} from "@/store/contact-us-store";

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