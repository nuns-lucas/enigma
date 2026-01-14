<script setup lang="ts">
//imports
import { ref } from 'vue';
import { test } from '@/logic/test.ts';

//Declarações variaveis
const userInput = ref<string>("");
const fraseEncriptada = ref<string>("");
var frase: string = "";
const nums: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]


// Função chamada toda toca de tecla
const handleInput = (event: Event) => {
  frase = fraseEncriptada.value

  // Input event
  const inputEvent = event as InputEvent;
  const target = event.target as HTMLInputElement;

  //Armazenar posição atual do cursor (necessário para mudar frase ecnriptada ao deletar)
  const cursorPosition = target.selectionStart ?? 0;

  // .data retira o charactere inserido
  const char = inputEvent.data;

  // Index aonde aconteceu a mudança
  const index = cursorPosition - 1;

  if (char in nums) {
    // Pegamos o que vem antes da letra digitada e o que vem depois
    const parteAntes = frase.substring(0, index);
    const parteDepois = frase.substring(index + 1);
    // Montamos a frase nova inserindo o resultado da criptografia no meio
    fraseEncriptada.value = parteAntes + char + parteDepois;

    //Retorna fraseEncriptada com mudanças
    return fraseEncriptada;

  }
  // Se o caractere inserido foi um espaço
  if (char == " ") {
    // Pegamos o que vem antes da letra digitada e o que vem depois
    const parteAntes = frase.substring(0, index);
    const parteDepois = frase.substring(index + 1);
    // Montamos a frase nova inserindo o resultado da criptografia no meio
    fraseEncriptada.value = parteAntes + " " + parteDepois;

    //Retorna fraseEncriptada com mudanças
    return fraseEncriptada;

  }

  // Se algum caractere foi inserido (sem ser espaço)
  if (char != null) {
    // resultado da encriptação
    const resultado = test(char);

    // Se eu tinha 10 letras e agora tenho 6, a diferença (4) é o que foi deletado.
    const diferenca = fraseEncriptada.value.length - (userInput.value.length - 1);
    const caracteresPular = diferenca > 0 ? diferenca : 0;

    // Pegamos o que vem antes da letra digitada e o que vem depois
    const parteAntes = frase.substring(0, index);
    const parteDepois = frase.substring(index + caracteresPular);

    // Montamos a frase nova inserindo o resultado da criptografia no meio
    fraseEncriptada.value = parteAntes + resultado + parteDepois;

    return fraseEncriptada;
  }
  // Senão se algum caractere for deletado
  else if (inputEvent.inputType.includes("delete")) {
    // Quando deletamos no input, precisamos saber qual posição foi apagada
    // Se o cursor está na posição X, e foi um Backspace, a letra apagada estava em X.
    const indexDel = cursorPosition;

    // Letra anterior ao caractere deletado
    const parteAntes = fraseEncriptada.value.substring(0, indexDel);
    // Pulamos exatamente 1 caractere na frase encriptada
    const parteDepois = fraseEncriptada.value.substring(indexDel + 1);

    // Nova frase encriptada porém sem o caractere que foi deletado do input box
    fraseEncriptada.value = parteAntes + parteDepois;
  }
  // caso tudo seja deletado no input a fraseEncriptada também é "limpa"
  if (target.value === "") {
    fraseEncriptada.value = "";
  }

}

</script>


<template>
  <div>
    <input v-model="userInput" @input="handleInput">

    <p>Resultado: {{ fraseEncriptada }}</p>

  </div>
</template>
