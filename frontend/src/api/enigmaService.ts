const API_BASE_URL = import.meta.env.VITE_API_URL;

export const EnigmaService = {
  async processText(text: string, positions = { p1: 0, p2: 0, p3: 0 }) {
    // Agora usamos a variável de ambiente aqui
    const response = await fetch(`${API_BASE_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, positions })
    });

    if (!response.ok) throw new Error('Falha na comunicação com a Enigma API');
    return response.json();
  }
};
