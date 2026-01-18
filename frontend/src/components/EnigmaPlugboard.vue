<template>
  <div class="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-sm font-bold text-yellow-700 uppercase tracking-widest">Plugboard Settings</h2>
      <button @click="addPlug" :disabled="modelValue.length >= 10"
        class="text-xs bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-600 px-4 py-2 rounded-lg border border-yellow-600/30 transition-all disabled:opacity-30">
        + CONNECT PAIR
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(plug, idx) in modelValue" :key="idx"
        class="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-gray-700 group">

        <div class="flex items-center gap-3">
          <select v-model="plug.a" @change="emitUpdate"
            class="bg-gray-900 text-yellow-500 font-mono rounded border border-gray-700 p-1 outline-none focus:border-yellow-600">
            <option value="">?</option>
            <option v-for="char in alphabet" :key="char" :value="char">{{ char }}</option>
          </select>

          <span class="text-gray-600 font-bold">↔</span>

          <select v-model="plug.b" @change="emitUpdate"
            class="bg-gray-900 text-yellow-500 font-mono rounded border border-gray-700 p-1 outline-none focus:border-yellow-600">
            <option value="">?</option>
            <option v-for="char in alphabet" :key="char" :value="char">{{ char }}</option>
          </select>
        </div>

        <button @click="removePlug(idx)" class="text-gray-600 hover:text-red-500 transition-colors px-2">
          ✕
        </button>
      </div>
    </div>

    <p v-if="modelValue.length === 0" class="text-center text-gray-600 text-sm italic">
      No plugs connected. Signal passes through normally.
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: { a: string, b: string }[] }>();
const emit = defineEmits(['update:modelValue']);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const addPlug = () => {
  if (props.modelValue.length < 10) {
    emit('update:modelValue', [...props.modelValue, { a: '', b: '' }]);
  }
};

const removePlug = (index: number) => {
  const updated = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updated);
};

const emitUpdate = () => emit('update:modelValue', props.modelValue);
</script>
