export class EnigmaEngine {
  private readonly ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly R1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  private readonly R2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
  private readonly R3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
  private readonly REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

  r1 = 0;
  r2 = 0;
  r3 = 0;

  // Modifique o reset para aceitar posições iniciais
  reset(pos = { p1: 0, p2: 0, p3: 0 }) {
    this.r1 = pos.p1;
    this.r2 = pos.p2;
    this.r3 = pos.p3;
  }

  // Modifique o processText para aceitar a configuração inicial
  public processText(text: string, initialPos = { p1: 0, p2: 0, p3: 0 }): string {
    this.reset(initialPos); // Configura os rotores antes de começar
    return text
      .toUpperCase()
      .split('')
      .map(char => this.processChar(char))
      .join('');
  }

  constructor() {
    this.reset();
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
