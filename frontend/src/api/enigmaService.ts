// GET API ADDRESS FROM .ENV
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const EnigmaService = {
  async processText(text: string, positions = { p1: 0, p2: 0, p3: 0 }) {
    // Connecting to the API
    const response = await fetch(`${API_BASE_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, positions })
    });

    if (!response.ok) throw new Error('Enigma API comms failed');
    return response.json();
  }
};
