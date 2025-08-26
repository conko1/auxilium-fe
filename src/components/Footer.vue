<template>
  <footer id="footer" class="p-0">
    <div class="container pt-6 pb-3">
      <div class="row">
        <div class="col-md-4">
          <h4 class="text-uppercase text-white">
            Adresa
          </h4>
          <address>
            <ul class="list-unstyled">
              <li>Zariadenie pre seniorov<br><span class="h5">Auxilium, n.o.</span></li>
              <li>Jozefa Martinčeka 108/50</li>
              <li>013 03 Varín</li>
            </ul>
          </address>
        </div>

        <div class="col-md-4">
          <h4 class="text-uppercase text-white">
            Telefón a email
          </h4>
          <ul class="list-unstyled">
            <li>
              <abbr title="Telefón"><i class="fa fa-phone fa-fw"></i></abbr>
              041 / 500 60 28
            </li>
            <li>
              <abbr title="Telefón"><i class="fa fa-phone fa-fw"></i></abbr>
              041 / 500 60 29
            </li>
            <li>
              <abbr title="Email"><i class="fa fa-envelope fa-fw"></i></abbr>
              dss.auxilium@gmail.com<br>
              <abbr title="Email"><i class="fa fa-envelope fa-fw"></i></abbr>
              penzionvarin@gmail.com
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h4 class="text-uppercase text-white">
            Fakturačné údaje
          </h4>
          <ul class="list-unstyled">
            <li>IČO: 457 399 27</li>
            <li>Banka: Slovenská sporiteľňa, a.s.</li>
            <li>IBAN: SK44 0900 0000 0050 3671 0437</li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-0 hr-blank op-2" />
    <div class="bg-inverse-dark text-sm py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0">Copyright &copy; 2018 Zariadenie pre seniorov Auxilium, n.o.</p>
          </div>
          <div class="col-md-6">
            <ul class="list-inline footer-links float-md-right mb-0 mr-5">
              <li v-if="!logged" class="list-inline-item"><router-link class="text-lime" :to="{name: 'login'}" data-toggle="scroll-link">PRIHLÁSIŤ</router-link></li>
              <li v-else class="list-inline-item" @click="logoutUser"><a class="text-lime" href="#header">ODHLÁSIŤ</a></li>
              <li class="d-none" id="contact-id">7ebc169393f3d25db318db511c59ae03816a0a87</li>
            </ul>
          </div>
        </div>
        <a href="#top" class="btn btn-icon btn-grey-dark pos-fixed pos-b pos-r mr-3 mb-3 scroll-state-hidden" title="Na začiatok stránky" data-scroll="scroll-state"><i class="fa fa-chevron-up"></i></a>
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

async function logoutUser() {
  await logout();
  logged.value = false;
}
</script>

<style scoped>

</style>