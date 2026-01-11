export function test(userInput: string) {
  const alfabeto: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotor1: string = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  let newText: string = "";
  var n = 0;

  for (var i = 0; i < userInput.length; i++) {
    while (userInput[i]?.toUpperCase() != alfabeto[n]) {
      n += 1
    }
    var index_entrada = (n + 1) % 26
    newText += rotor1[(index_entrada - 1 + 26) % 26]
    n = 0
  };
  return newText;
}
