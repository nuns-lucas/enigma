import express from 'express';
import cors from 'cors';
import { EnigmaEngine } from './enigmaEngine';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/process', (req, res) => {
  const { text, positions, rotorIds, plugboard } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });

  const engine = new EnigmaEngine();
  const result = engine.processText(text, positions, rotorIds, plugboard || "");

  res.json({
    result,
    finalPositions: { p1: engine.r1, p2: engine.r2, p3: engine.r3 }
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
