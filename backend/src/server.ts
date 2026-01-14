import express from 'express';
import cors from 'cors'; // IMPORTANT FOR VUE TO ACCESS API
import { EnigmaEngine } from './enigmaEngine';

const app = express();
app.use(cors()); // Let front-end back-end comms
app.use(express.json());

app.post('/api/process', (req, res) => {
  // Now extracting rotorIds along with text and positions
  const { text, positions, rotorIds } = req.body;

  // Body Example:
  // {
  //   "text": "HELLO",
  //   "positions": {"p1": 0, "p2": 7, "p3": 15},
  //   "rotorIds": {"r1": 1, "r2": 2, "r3": 3}
  // }

  if (!text) return res.status(400).json({ error: "Texto faltando" });

  // Create a fresh instance for each request to ensure real-time accuracy
  const engine = new EnigmaEngine();

  // Passing both positions and rotor choices to the engine
  const result = engine.processText(text, positions, rotorIds);

  res.json({
    result,
    finalPositions: { p1: engine.r1, p2: engine.r2, p3: engine.r3 }
  });
});

app.listen(3000, () => console.log("Backend running 3000"));
