export class EnigmaEngine {
  private readonly ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly R1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  private readonly R2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
  private readonly R3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
  private readonly REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

  private r1 = 0;
  private r2 = 0;
  private r3 = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.r1 = 0;
    this.r2 = 0;
    this.r3 = 0;
  }

  // Função principal de processamento de texto
  public processText(text: string): string {
    this.reset();
    return text
      .toUpperCase()
      .split('')
      .map(char => this.processChar(char))
      .join('');
  }

  private processChar(char: string): string {
    if (!this.ALPHA.includes(char)) return char;

    // 1. Lógica de Giro (Double Step)
    const r3AtNotch = (this.r3 === 21); // V
    const r2AtNotch = (this.r2 === 4);  // E

    if (r2AtNotch) {
      this.r2 = (this.r2 + 1) % 26;
      this.r1 = (this.r1 + 1) % 26;
    } else if (r3AtNotch) {
      this.r2 = (this.r2 + 1) % 26;
    }
    this.r3 = (this.r3 + 1) % 26;

    // 2. Encriptação (O sinal elétrico)
    let idx = this.ALPHA.indexOf(char);

    // Ida (Direita -> Esquerda)
    idx = this.rotorPass(idx, this.R3, this.r3);
    idx = this.rotorPass(idx, this.R2, this.r2);
    idx = this.rotorPass(idx, this.R1, this.r1);

    // Refletor
    idx = this.ALPHA.indexOf(this.REFLECTOR[idx]);

    // Volta (Esquerda -> Direita)
    idx = this.rotorPassInverse(idx, this.R1, this.r1);
    idx = this.rotorPassInverse(idx, this.R2, this.r2);
    idx = this.rotorPassInverse(idx, this.R3, this.r3);

    return this.ALPHA[idx];
  }

  private rotorPass(i: number, rotor: string, offset: number): number {
    const shiftIn = (i + offset) % 26;
    const letter = rotor[shiftIn];
    return (this.ALPHA.indexOf(letter) - offset + 26) % 26;
  }

  private rotorPassInverse(i: number, rotor: string, offset: number): number {
    const shiftIn = (i + offset) % 26;
    const letter = this.ALPHA[shiftIn];
    const posInRotor = rotor.indexOf(letter);
    return (posInRotor - offset + 26) % 26;
  }
}
