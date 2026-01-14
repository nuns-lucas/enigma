import express from 'express';
import cors from 'cors'; // IMPORTANT FOR VUE TO ACCESS API
import { EnigmaEngine } from './enigmaEngine';

const app = express();
app.use(cors()); // Let front-end back-end comms
app.use(express.json());

const engine = new EnigmaEngine();

app.post('/api/process', (req, res) => {
  const { text, positions } = req.body;
  // Body Example: { "text": "HELLO", "positions": {"p1": 0, "p2": 7, "p3": 15} }

  if (!text) return res.status(400).json({ error: "Texto faltando" });

  const result = engine.processText(text, positions);

  res.json({
    result,
    finalPositions: { p1: engine.r1, p2: engine.r2, p3: engine.r3 }
  });
});

app.listen(3000, () => console.log("Backend running 3000"));
