<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

const toChar = (val: number) => String.fromCharCode(65 + val);

const update = (delta: number) => {
  let newValue = props.modelValue + delta;
  if (newValue > 25) newValue = 0;
  if (newValue < 0) newValue = 25;
  emit('update:modelValue', newValue);
};
</script>

<template>
  <div class="flex flex-col items-center">
    <span class="text-xs font-bold text-gray-500 mb-2 uppercase">{{ label }}</span>
    <div class="bg-gray-800 border-2 border-gray-700 rounded-xl p-3 flex flex-col items-center shadow-lg">
      <button @click="update(1)" class="text-yellow-500 hover:text-yellow-400 text-xl font-bold">▲</button>
      <div class="w-12 h-16 bg-gray-900 flex items-center justify-center my-2 rounded border border-gray-600">
        <span class="text-3xl font-mono text-white">{{ toChar(modelValue) }}</span>
      </div>
      <button @click="update(-1)" class="text-yellow-500 hover:text-yellow-400 text-xl font-bold">▼</button>
    </div>
  </div>
</template>
