<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Vyberte súbor alebo zadajte vlastnú url</h3>
        <button class="close-btn" @click="$emit('cancel')" aria-label="Close">×</button>
      </div>

      <div class="modal-body">
        <div class="options">
          <button
            v-for="opt in options"
            :key="opt"
            class="option"
            type="button"
            @click="$emit('select', opt.url)"
          >
            {{ opt.name }}
          </button>
        </div>

        <div class="divider">alebo</div>

        <label class="custom-input">
          <span>Vlastná URL adresa</span>
          <input
            v-model="custom"
            type="text"
            placeholder="https://www.url.sk"
            @keyup.enter="$emit('select', custom)"
          />
        </label>
      </div>

      <div class="modal-footer">
        <button class="btn" type="button" @click="$emit('select', custom)">Použi URL</button>
        <button class="btn ghost" type="button" @click="$emit('cancel')">Zruš</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
export interface LinkOptions {
  url: string,
  name: string
}

defineProps<{ options: LinkOptions[] }>();

const custom = ref("");
</script>

<style scoped>
.modal-backdrop {
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
}
.modal-card {
  width: min(720px, 92vw);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}
.modal-header h3 {
  margin: 0;
  font-size: 18px;
}
.close-btn {
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}
.modal-body {
  padding: 16px 20px;
}
.options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 8px;
}
.option {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fafafa;
  cursor: pointer;
}
.option:hover {
  background: #f3f4f6;
}
.divider {
  text-align: center;
  opacity: 0.6;
  font-size: 12px;
  margin: 14px 0;
}
.custom-input {
  display: grid;
  gap: 6px;
}
.custom-input input {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
}
.modal-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 14px 20px 18px;
  border-top: 1px solid #eee;
}
.btn {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
}
.btn.ghost {
  background: transparent;
}
</style>
