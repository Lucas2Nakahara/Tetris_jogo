
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let scoreData = [];

app.post("/score", (req, res) => {
    const { score } = req.body;
    scoreData.push({ score, date: new Date() });
    res.status(201).json({ message: "Score salvo com sucesso" });
});

app.get("/scores", (req, res) => {
    res.json(scoreData);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});