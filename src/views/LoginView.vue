<template>
  <div class="flex-1-1-auto container d-flex justify-content-center">
    <div class="form-signin w-50 mt-5">
      <form @submit.prevent="handleLogin">
        <h1 class="h3 mb-3 fw-normal">Prihlásenie</h1>
        <p v-if="error" class="mb-2 text-red">S poskytnutými údajmi sa nebolo možné prihlásiť</p>
        <div class="form-floating">
          <input id="floatingInput" v-model="email" class="form-control" placeholder="Email"
                 type="email">
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating mt-2">
          <input id="floatingPassword" v-model="password" class="form-control" placeholder="Heslo"
                 type="password" required>
          <label for="floatingPassword">Heslo</label>
        </div>
        <button v-if="!loading" class="btn btn-primary w-100 py-2 mt-4" type="submit">Prihlásiť</button>
        <div v-else class="d-flex justify-content-center">
          <div class="spinner-border mt-4" role="status"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {login} from "@/services/auth-service";
import {LoginData} from "@/types/auth-types";
import {useRouter} from "vue-router";
import {AxiosError} from "axios";
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";

const router = useRouter();

const store = useContentsStore();
const { logged } = storeToRefs(store);

const email = ref("");
const password = ref("");

const loading = ref(false);
const error = ref(false);

async function handleLogin() {
  const loginData: LoginData = {
    email: email.value,
    password: password.value
  }

  try {
    error.value = false;
    loading.value = true;
    await login(loginData);
    router.push({name: "home"});
    logged.value = true;
  } catch (e) {
    if ((e as AxiosError).response?.status) {
      error.value = true;
    }
  } finally {
    loading.value = false;
  }
}
</script>
<style lang="scss" scoped> .flex-1-1-auto {
  flex: 1 1 auto;
}

@media (max-width: 767.98px) {
  .form-signin {
    width: 75% !important;
  }
} </style>