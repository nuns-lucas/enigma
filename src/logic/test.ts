export function test(char: string): string {
  const rotor1: string = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  var indexABC: number = mapABC(char.toUpperCase())

  var resultado = rotor1[indexABC]

  if (resultado != null) {
    return resultado;
  }

  return ""

}

function mapABC(letter: string): number {
  const alfabeto: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 25; i++) {
    if (letter == alfabeto[i]) {
      return i;
    }
  }
  return 0;
}
