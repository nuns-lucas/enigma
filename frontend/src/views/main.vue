<script setup lang="ts">
import { ref, watch } from 'vue';
import { EnigmaService } from '@/api/enigmaService'; // Importa o service

const userInput = ref("");
const resultado = ref("");

watch(userInput, async (newValue) => {
  try {
    const data = await EnigmaService.processText(newValue);
    resultado.value = data.result;
  } catch (err) {
    resultado.value = "Erro de conexão";
  }
});
</script>
