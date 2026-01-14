export class EnigmaEngine {
  private readonly ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly R1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  private readonly R2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
  private readonly R3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
  private readonly REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

  r1 = 0;
  r2 = 0;
  r3 = 0;

  // Mod reset to accept diff positions
  reset(pos = { p1: 0, p2: 0, p3: 0 }) {
    this.r1 = pos.p1;
    this.r2 = pos.p2;
    this.r3 = pos.p3;
  }

  // Mod proceesText to accept different positions
  public processText(text: string, initialPos = { p1: 0, p2: 0, p3: 0 }): string {
    this.reset(initialPos); // Config rotors before starting
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
    // If not on alphabet returns same value
    if (!this.ALPHA.includes(char)) return char;

    //Spin logic (Double Step)
    const r3AtNotch = (this.r3 === 21); // V
    const r2AtNotch = (this.r2 === 4);  // E

    if (r2AtNotch) {
      this.r2 = (this.r2 + 1) % 26;
      this.r1 = (this.r1 + 1) % 26;
    } else if (r3AtNotch) {
      this.r2 = (this.r2 + 1) % 26;
    }
    this.r3 = (this.r3 + 1) % 26;

    // Encryption (Electric signal )
    let idx = this.ALPHA.indexOf(char);

    // Going (Right -> Left)
    idx = this.rotorPass(idx, this.R3, this.r3);
    idx = this.rotorPass(idx, this.R2, this.r2);
    idx = this.rotorPass(idx, this.R1, this.r1);

    // Refelctor
    idx = this.ALPHA.indexOf(this.REFLECTOR[idx]);

    // Back (Left -> Rigth)
    idx = this.rotorPassInverse(idx, this.R1, this.r1);
    idx = this.rotorPassInverse(idx, this.R2, this.r2);
    idx = this.rotorPassInverse(idx, this.R3, this.r3);

    // Return letter value
    return this.ALPHA[idx];
  }

  // Rotor change for going
  private rotorPass(i: number, rotor: string, offset: number): number {
    const shiftIn = (i + offset) % 26;
    const letter = rotor[shiftIn];
    return (this.ALPHA.indexOf(letter) - offset + 26) % 26;
  }

  // Rotor change for returning (After relector)
  private rotorPassInverse(i: number, rotor: string, offset: number): number {
    const shiftIn = (i + offset) % 26;
    const letter = this.ALPHA[shiftIn];
    const posInRotor = rotor.indexOf(letter);
    return (posInRotor - offset + 26) % 26;
  }
}
