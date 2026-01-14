export class EnigmaEngine {
  private readonly ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Library of the 5 historical rotors
  private readonly ROTOR_LIBRARY: Record<number, { wire: string, notch: number }> = {
    1: { wire: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: 16 }, // Q
    2: { wire: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: 4 },  // E
    3: { wire: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: 21 }, // V
    4: { wire: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: 9 },  // J
    5: { wire: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: 25 }  // Z
  };

  private readonly REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

  // Placeholders for the 3 rotors currently "plugged in"
  private activeR1 = { wire: "", notch: 0 };
  private activeR2 = { wire: "", notch: 0 };
  private activeR3 = { wire: "", notch: 0 };

  r1 = 0; r2 = 0; r3 = 0;

  reset(pos = { p1: 0, p2: 0, p3: 0 }, ids = { r1: 1, r2: 2, r3: 3 }) {
    this.r1 = pos.p1;
    this.r2 = pos.p2;
    this.r3 = pos.p3;
    // Set the wiring based on the user's selection
    this.activeR1 = this.ROTOR_LIBRARY[ids.r1] || this.ROTOR_LIBRARY[1];
    this.activeR2 = this.ROTOR_LIBRARY[ids.r2] || this.ROTOR_LIBRARY[2];
    this.activeR3 = this.ROTOR_LIBRARY[ids.r3] || this.ROTOR_LIBRARY[3];
  }

  public processText(text: string, initialPos: any, rotorIds: any): string {
    this.reset(initialPos, rotorIds);
    return text.toUpperCase().split('').map(char => this.processChar(char)).join('');
  }

  private processChar(char: string): string {
    if (!this.ALPHA.includes(char)) return char;

    // Stepping logic using the notches of the SELECTED rotors
    if (this.r2 === this.activeR2.notch) {
      this.r2 = (this.r2 + 1) % 26;
      this.r1 = (this.r1 + 1) % 26;
    } else if (this.r3 === this.activeR3.notch) {
      this.r2 = (this.r2 + 1) % 26;
    }
    this.r3 = (this.r3 + 1) % 26;

    let idx = this.ALPHA.indexOf(char);
    idx = this.rotorPass(idx, this.activeR3.wire, this.r3);
    idx = this.rotorPass(idx, this.activeR2.wire, this.r2);
    idx = this.rotorPass(idx, this.activeR1.wire, this.r1);
    idx = this.ALPHA.indexOf(this.REFLECTOR[idx]);
    idx = this.rotorPassInverse(idx, this.activeR1.wire, this.r1);
    idx = this.rotorPassInverse(idx, this.activeR2.wire, this.r2);
    idx = this.rotorPassInverse(idx, this.activeR3.wire, this.r3);
    return this.ALPHA[idx];
  }

  private rotorPass(i: number, wire: string, off: number): number {
    const shiftIn = (i + off) % 26;
    return (this.ALPHA.indexOf(wire[shiftIn]) - off + 26) % 26;
  }

  private rotorPassInverse(i: number, wire: string, off: number): number {
    const shiftIn = (i + off) % 26;
    return (wire.indexOf(this.ALPHA[shiftIn]) - off + 26) % 26;
  }
}
