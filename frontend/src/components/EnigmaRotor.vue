<script setup lang="ts">
// Props for component
defineProps<{
  modelValue: number; // Exposition value (0 - 25)
  label: string;      // Ex: "ROTOR 1"
}>();

// Update event definition
const emit = defineEmits(['update:modelValue']);

// Go up and Down
const increment = (val: number) => emit('update:modelValue', val < 25 ? val + 1 : 0);
const decrement = (val: number) => emit('update:modelValue', val > 0 ? val - 1 : 25);

// Go from ASCII code to char
const toChar = (val: number) => String.fromCharCode(65 + val);
</script>

<template>
  <div class="flex flex-col items-center">
    <label class="text-xs mb-2 text-gray-400 font-bold uppercase">{{ label }}</label>

    <div class="relative flex flex-col items-center bg-gray-800 border-2 border-gray-600 rounded-lg p-3 shadow-inner">
      <button @click="increment(modelValue)" class="text-gray-400 hover:text-yellow-500 transition-colors text-xl">
        ▲
      </button>

      <div class="bg-gray-900 my-2 w-14 h-14 flex items-center justify-center border border-gray-700 rounded shadow-lg">
        <span class="text-3xl font-mono font-bold text-yellow-500">
          {{ toChar(modelValue) }}
        </span>
      </div>

      <button @click="decrement(modelValue)" class="text-gray-400 hover:text-yellow-500 transition-colors text-xl">
        ▼
      </button>
    </div>

    <span class="text-[10px] mt-2 text-gray-500 font-mono">POS: {{ modelValue }}</span>
  </div>
</template>
