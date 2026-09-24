<template>
  <footer id="footer" class="au-footer">
    <div class="container pt-5 pb-4">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-3">
          <div class="au-brand mb-3">
            <span class="au-brand__mark" aria-hidden="true">a</span>
            <span class="au-brand__text">
              <span class="au-brand__name">auxilium</span>
              <span class="au-brand__tag">služby seniorom</span>
            </span>
          </div>
          <p class="small mb-0">Láskavá a plnohodnotná starostlivosť o seniorov vo Varíne.</p>
        </div>

        <div class="col-sm-6 col-lg-3">
          <h4>Adresa</h4>
          <address class="mb-0">
            <ul>
              <li>Zariadenie pre seniorov<br><strong class="text-white">Auxilium, n.o.</strong></li>
              <li>Jozefa Martinčeka 108/50</li>
              <li>013 03 Varín</li>
            </ul>
          </address>
        </div>

        <div class="col-sm-6 col-lg-3">
          <h4>Telefón a email</h4>
          <ul>
            <li><i class="bi bi-telephone me-2"></i><a href="tel:+421415006028">041 / 500 60 28</a></li>
            <li><i class="bi bi-telephone me-2"></i><a href="tel:+421415006029">041 / 500 60 29</a></li>
            <li><i class="bi bi-envelope me-2"></i><a href="mailto:dss.auxilium@gmail.com">dss.auxilium@gmail.com</a></li>
            <li><i class="bi bi-envelope me-2"></i><a href="mailto:penzionvarin@gmail.com">penzionvarin@gmail.com</a></li>
          </ul>
        </div>

        <div class="col-sm-6 col-lg-3">
          <h4>Fakturačné údaje</h4>
          <ul>
            <li>IČO: 57 603 189</li>
            <li>Banka: Slovenská sporiteľňa, a.s.</li>
            <li>IBAN: SK44 0900 0000 0050 3671 0437</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="au-footer__bar py-3">
      <div class="container d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span>© {{ year }} Zariadenie pre seniorov Auxilium, n.o.</span>
        <ul class="d-flex align-items-center gap-4">
          <li><a href="#domov" @click.prevent="toTop">Späť hore ↑</a></li>
          <li v-if="!logged"><router-link :to="{name: 'login'}">Prihlásiť</router-link></li>
          <li v-else><a href="#" @click.prevent="logoutUser">Odhlásiť</a></li>
          <li class="d-none" id="contact-id">7ebc169393f3d25db318db511c59ae03816a0a87</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {useContentsStore} from "@/store/contents-store";
import {storeToRefs} from "pinia";
import { logout } from "@/services/auth-service";

const store = useContentsStore();
const { logged } = storeToRefs(store);
const year = new Date().getFullYear();

async function logoutUser() {
  await logout();
  logged.value = false;
}

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
