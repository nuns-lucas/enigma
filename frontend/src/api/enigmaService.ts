const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Slot {
  rotorID: number;
  position: number;
}

export const EnigmaService = {
  async processText(text: string, slots: Slot[], plugboard: string) {
    const payload = {
      text,
      positions: {
        p1: slots[0].position,
        p2: slots[1].position,
        p3: slots[2].position
      },
      rotorIds: {
        r1: slots[0].rotorID,
        r2: slots[1].rotorID,
        r3: slots[2].rotorID
      },
      plugboard // e.g., "AZ BY"
    };

    const response = await fetch(`${API_BASE_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Enigma API comms failed');
    return response.json();
  }
};
