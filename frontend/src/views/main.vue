<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center justify-center">
    <div class="w-full max-w-4xl bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <h1 class="text-4xl font-black mb-10 text-center text-yellow-600 tracking-tighter">ENIGMA ENGINE</h1>

      <div class="flex justify-center gap-8 mb-12">
        <div v-for="(slot, index) in slots" :key="index" class="flex flex-col items-center gap-4">
          <select v-model="slot.rotorID"
            class="bg-gray-800 text-yellow-500 border border-gray-700 rounded px-2 py-1 text-xs outline-none focus:border-yellow-600">
            <option v-for="n in 5" :key="n" :value="n">Rotor {{ n }}</option>
          </select>
          <EnigmaRotor v-model="slot.position" :label="'Slot ' + (index + 1)" />
        </div>
      </div>

      <EnigmaPlugboard v-model="plugs" />

      <div class="space-y-6 mt-10">
        <input v-model="userInput" placeholder="Type message..."
          class="w-full bg-gray-950 border-2 border-gray-800 rounded-xl p-5 text-2xl font-mono uppercase focus:border-yellow-600 outline-none" />

        <div class="bg-black p-6 rounded-xl border border-yellow-900/30">
          <p class="text-xs text-yellow-700 font-bold uppercase mb-2">Encrypted Output</p>
          <p class="text-3xl font-mono break-all text-yellow-500 min-h-[1.2em]">{{ result || '---' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { EnigmaService } from '@/api/enigmaService';
import EnigmaRotor from '@/components/EnigmaRotor.vue';
import EnigmaPlugboard from '@/components/EnigmaPlugboard.vue';

const slots = ref([
  { rotorID: 1, position: 0 },
  { rotorID: 2, position: 0 },
  { rotorID: 3, position: 0 }
]);

const plugs = ref<{ a: string; b: string }[]>([]);
const userInput = ref("");
const result = ref("");

const processTextAPI = async () => {
  if (!userInput.value) return (result.value = "");

  // Format plugs for the API: "AB CD EF"
  const plugboardString = plugs.value
    .filter(p => p.a && p.b)
    .map(p => `${p.a}${p.b}`)
    .join(" ");

  try {
    const data = await EnigmaService.processText(userInput.value, slots.value, plugboardString);
    result.value = data.result;
  } catch (error) {
    result.value = "API ERROR";
  }
};

watch([userInput, slots, plugs], () => processTextAPI(), { deep: true });
</script>
