export class EnigmaEngine {
  private readonly ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly ROTOR_LIBRARY: Record<number, { wire: string, notch: number }> = {
    1: { wire: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: 16 },
    2: { wire: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: 4 },
    3: { wire: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: 21 },
    4: { wire: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: 9 },
    5: { wire: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: 25 }
  };
  private readonly REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

  private activeR1 = { wire: "", notch: 0 };
  private activeR2 = { wire: "", notch: 0 };
  private activeR3 = { wire: "", notch: 0 };
  private plugMap: Map<string, string> = new Map();

  r1 = 0; r2 = 0; r3 = 0;

  reset(pos: any, ids: any, plugboard: string) {
    this.r1 = pos.p1;
    this.r2 = pos.p2;
    this.r3 = pos.p3;
    this.activeR1 = this.ROTOR_LIBRARY[ids.r1] || this.ROTOR_LIBRARY[1];
    this.activeR2 = this.ROTOR_LIBRARY[ids.r2] || this.ROTOR_LIBRARY[2];
    this.activeR3 = this.ROTOR_LIBRARY[ids.r3] || this.ROTOR_LIBRARY[3];

    // Build the plugboard mapping
    this.plugMap.clear();
    if (plugboard) {
      plugboard.split(" ").forEach(pair => {
        if (pair.length === 2) {
          const [a, b] = pair.split("");
          this.plugMap.set(a, b);
          this.plugMap.set(b, a);
        }
      });
    }
  }

  public processText(text: string, initialPos: any, rotorIds: any, plugboard: string): string {
    this.reset(initialPos, rotorIds, plugboard);
    return text.toUpperCase().split('').map(char => this.processChar(char)).join('');
  }

  private swap(char: string): string {
    return this.plugMap.get(char) || char;
  }

  private processChar(char: string): string {
    if (!this.ALPHA.includes(char)) return char;

    // 1. Rotation Logic
    if (this.r2 === this.activeR2.notch) {
      this.r2 = (this.r2 + 1) % 26;
      this.r1 = (this.r1 + 1) % 26;
    } else if (this.r3 === this.activeR3.notch) {
      this.r2 = (this.r2 + 1) % 26;
    }
    this.r3 = (this.r3 + 1) % 26;

    // 2. Initial Plugboard Swap
    let charToProcess = this.swap(char);

    // 3. Rotor Forward Pass
    let idx = this.ALPHA.indexOf(charToProcess);
    idx = this.rotorPass(idx, this.activeR3.wire, this.r3);
    idx = this.rotorPass(idx, this.activeR2.wire, this.r2);
    idx = this.rotorPass(idx, this.activeR1.wire, this.r1);

    // 4. Reflector
    idx = this.ALPHA.indexOf(this.REFLECTOR[idx]);

    // 5. Rotor Inverse Pass
    idx = this.rotorPassInverse(idx, this.activeR1.wire, this.r1);
    idx = this.rotorPassInverse(idx, this.activeR2.wire, this.r2);
    idx = this.rotorPassInverse(idx, this.activeR3.wire, this.r3);

    // 6. Final Plugboard Swap
    return this.swap(this.ALPHA[idx]);
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
