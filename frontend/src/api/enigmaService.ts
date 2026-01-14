const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Slot {
  rotorID: number;
  position: number;
}

export const EnigmaService = {
  async processText(text: string, slots: Slot[]) {
    const payload = {
      text: text,
      // The 3 physical positions
      positions: {
        p1: slots[0].position,
        p2: slots[1].position,
        p3: slots[2].position
      },
      // The 3 selected rotor types (1-5)
      rotorIds: {
        r1: slots[0].rotorID,
        r2: slots[1].rotorID,
        r3: slots[2].rotorID
      }
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
