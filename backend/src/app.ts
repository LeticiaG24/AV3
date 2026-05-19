import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/funcionarios", async (req, res) => {
  const funcionarios = await prisma.funcionario.findMany();

  res.json(funcionarios);
});

app.post("/funcionarios", async (req, res) => {
  const { nome, endereco, usuario, senha, telefone, nivelPermissao } = req.body;
  const funcionario = await prisma.funcionario.create({
    data: {
      nome,
      endereco,
      usuario,
      senha,
      telefone,
      nivelPermissao,
    }
  });

  res.json(funcionario);
});

app.get("/aeronaves", async (req, res) => {
  const aeronaves = await prisma.aeronave.findMany();

  res.json(aeronaves);
});

app.get("/aeronaves/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const aeronave = await prisma.aeronave.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json(aeronave);
  }
  catch (error) {
    res.status(404).json({ error: "Aeronave não encontrada" });
  }
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