import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/aeronaves", async (req, res) => {
  const aeronaves = await prisma.aeronave.findMany();

  res.json(aeronaves);
});

app.post("/aeronaves", async (req, res) => {
  const aeronave = await prisma.aeronave.create({
    data: req.body,
  });

  res.json(aeronave);
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta http://localhost:3333");
});