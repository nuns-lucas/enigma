<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center justify-center">
    <div class="w-full max-w-3xl bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <h1 class="text-4xl font-black mb-10 text-center tracking-tighter text-yellow-600">ENIGMA ENGINE</h1>

      <!-- Rotors -->
      <div class="flex justify-center gap-8 mb-12">
        <EnigmaRotor v-model="r1" label="Rotor I" />
        <EnigmaRotor v-model="r2" label="Rotor II" />
        <EnigmaRotor v-model="r3" label="Rotor III" />
      </div>

      <!-- Input + Output -->
      <div class="space-y-6">
        <!-- Input box -->
        <input v-model="userInput"
          class="w-full bg-gray-950 border-2 border-gray-800 rounded-xl p-5 text-2xl font-mono uppercase focus:border-yellow-600 outline-none transition-all placeholder:text-gray-700"
          placeholder="Entrada de texto..." />

        <!-- Output box -->
        <div class="bg-black p-6 rounded-xl border border-yellow-900/30">
          <p class="text-xs text-yellow-700 font-bold uppercase mb-2">Saída Encriptada</p>
          <p class="text-3xl font-mono break-all text-yellow-500 min-h-[1.2em]">
            {{ result || '---' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
// imports
import { ref, watch } from 'vue';
import { EnigmaService } from '@/api/enigmaService'; // Import API connection/ connector
import EnigmaRotor from '@/components/EnigmaRotor.vue'; // Import rotor visual component

//Rotor values
const r1 = ref(0);
const r2 = ref(0);
const r3 = ref(0);

//Values for getting input + print result
const userInput = ref("");
const result = ref("");
const isLoading = ref(false);


// Fucntion API calling + passing params
const processTextAPI = async () => {
  //If input void return nothing
  if (!userInput.value) {
    result.value = "";
    return;
  }
  // Try API comms
  try {
    isLoading.value = true;
    // const data = resutl from API
    const data = await EnigmaService.processText(userInput.value, {
      p1: r1.value, p2: r2.value, p3: r3.value
    });
    result.value = data.result;
  } catch (error) { // IF ERROR
    result.value = "ERRO NA API";
  } finally { // IF WE GOOD
    isLoading.value = false; //SHUT DOWN
  }
};

// Watching change on input field then calling function for API calling
watch([userInput, r1, r2, r3], () => processTextAPI());
</script>
