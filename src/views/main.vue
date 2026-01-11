<script setup lang="ts">
import { ref } from 'vue';
import { test } from '@/logic/test.ts';

const userInput = ref('');
const resultado = ref('');

const handleEncrypt = () => {
  resultado.value = test(userInput.value);
}
</script>


<template>
  <div>
    <input v-model="userInput" @change="handleEncrypt">

    <p>Resultado: {{ resultado }}</p>

  </div>
</template>
