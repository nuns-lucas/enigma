import express from 'express';
import cors from 'cors'; // Importante para o Vue conseguir acessar a API
import { EnigmaEngine } from './enigmaEngine';

const app = express();
app.use(cors()); // Permite que seu frontend fale com o backend
app.use(express.json());

const engine = new EnigmaEngine();

app.post('/api/process', (req, res) => {
  const { text, positions } = req.body;
  // Exemplo de body: { "text": "HELLO", "positions": {"p1": 0, "p2": 7, "p3": 15} }

  if (!text) return res.status(400).json({ error: "Texto faltando" });

  const result = engine.processText(text, positions);

  res.json({
    result,
    finalPositions: { p1: engine.r1, p2: engine.r2, p3: engine.r3 }
  });
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
