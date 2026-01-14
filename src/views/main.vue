<script setup lang="ts">
import { ref, watch } from 'vue';
import { EnigmaEngine } from '@/logic/enigmaEngine';

const userInput = ref("");
const resultado = ref("");

// Remova a instância global 'const engine = new EnigmaEngine();' daqui

watch(userInput, (newValue) => {
  const engine = new EnigmaEngine();
  resultado.value = engine.processText(newValue);
});
</script>

<template>
  <div class="p-10">
    <input v-model="userInput" class="border p-2 w-full" placeholder="Digite aqui..." />
    <p class="mt-4 font-mono">Resultado: {{ resultado }}</p>
  </div>
</template>
