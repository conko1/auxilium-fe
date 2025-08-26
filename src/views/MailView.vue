<template>
  <div class="flex-1-1-auto container ">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <h1 class="h4 mb-0">Maily</h1>
    </div>

    <ul class="list-group shadow-sm my-3">
      <li
        class="list-group-item file-item p-3"
        v-for="(contactUs, index) in contactUses"
        :class="{'seen': contactUs.mailed_back}"
        :key="index"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="fw-semibold">
            {{ contactUs.recipient_name }} <br>
            <small class="text-muted">{{ contactUs.email }}</small>
          </div>
          <div>
            <i v-if="!contactUs.mailed_back" class="bi bi-eye h3 me-2 cursor-pointer" @click="setSeen(contactUs.id)"></i>
            <i class="bi bi-envelope-at h3 cursor-pointer" @click="mailBack(contactUs)"></i>
          </div>
        </div>

        <div class="text-body">
          {{ contactUs.body }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useContactUsStore} from "@/store/contact-us-store";
import {storeToRefs} from "pinia";
import {ContactUs} from "@/types/contact-us-types";
import {onMounted} from "vue";

const store = useContactUsStore();
const { contactUses } = storeToRefs(store);

function mailBack(contactUs: ContactUs) {
  const base = "https://mail.google.com/mail/?view=cm&fs=1";
  const params = new URLSearchParams();

  if (contactUs.email) {
    params.append("to", contactUs.email);
    params.append("su", "Odpoveď na Vašu otázku");
  }

  const gmailUrl = `${base}&${params.toString()}`;
  window.open(gmailUrl, "_blank");
}

function setSeen(id: number) {
  const contactUsDraft: ContactUs = {
    mailed_back: true
  }

  store.patchContactUs(id, contactUsDraft);
}

onMounted(() => {
  store.fetchAll();
})
</script>

<style scoped lang="scss">
.list-group-item.seen {
    background-color: #f6f6f6;
}

.flex-1-1-auto {
  flex: 1 1 auto;
}
</style>