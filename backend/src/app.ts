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

app.get("/funcionarios/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const funcionario = await prisma.funcionario.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(funcionario);
  }
  catch (error) {
    res.status(404).json({ error: "Funcionário não encontrado" });
  }
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
      include: {
        pecas: true,
        etapas: true,
        testes: true,
      },
    });

    res.json(aeronave);
  }
  catch (error) {
    res.status(404).json({ error: "Aeronave não encontrada" });
  }
});

app.post("/aeronaves", async (req, res) => {
  const { codigo, modelo, tipo, capacidade, alcance } = req.body;

  const aeronave = await prisma.aeronave.create({
    data: {
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance),
      
      testes: {
        create: [
          {
            tipo: "Aerodinamico",
          },
          {
            tipo: "Eletrico",
          },
          {
            tipo: "Hidraulico",
          },
          ]
      },
    },
  });

  res.json(aeronave);
});

app.get("/pecas", async (req, res) => {
  const pecas = await prisma.peca.findMany();
  res.json(pecas);
});

app.get("/pecas/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const peca = await prisma.peca.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(peca);
  }
  catch (error) {
    res.status(404).json({ error: "Peça não encontrada" });
  }
});

app.put("/pecas/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pecaAtualizada = await prisma.peca.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.json(pecaAtualizada);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar peça",
    });
  }
});

app.post("/pecas", async (req, res) => {
  const { nome, tipo, status, fornecedor, aeronaveId } = req.body;

  const peca = await prisma.peca.create({
    data: {
      nome,
      tipo,
      status,
      fornecedor,
      aeronaveId: Number(aeronaveId),
    },
  });

  res.status(201).json(peca);
});

app.get("/testes", async (req, res) => {
  const testes = await prisma.teste.findMany();
  res.json(testes);
});

app.get("/testes/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const teste = await prisma.teste.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(teste);
  }
  catch (error) {
    res.status(404).json({ error: "Teste não encontrado" });
  }
});

app.post("/testes", async (req, res) => {
  const teste = await prisma.teste.create({
    data: req.body,
  });
  res.json(teste);
});

app.put("/testes/:id", async (req, res) => {
  const { id } = req.params;
  const { resultado } = req.body;

  const teste = await prisma.teste.update({
    where: {
      id: Number(id),
    },
    data: {
      resultado,
    },
  });

  res.json(teste);
});

app.get("/etapas", async (req, res) => {
  const etapas = await prisma.etapa.findMany();
  res.json(etapas);
});

app.get("/etapas/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const etapa = await prisma.etapa.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        funcionarios: true,
      },
    });
    res.json(etapa);
  }
  catch (error) {
    res.status(404).json({ error: "Etapa não encontrada" });
  }
});

app.post("/etapas/:id/funcionarios", async (req, res) => {
  const etapaId = Number(req.params.id);
  const { funcionarioId } = req.body;

  const etapaAtualizada = await prisma.etapa.update({
    where: { id: etapaId },
    data: {
      funcionarios: {
        connect: {
          id: funcionarioId,
        },
      },
    },
    include: {
      funcionarios: true,
    },
  });

  res.json(etapaAtualizada);
});

app.put("/etapas/:id/status", async (req, res) => {
  const etapaId = Number(req.params.id);
  const { status } = req.body;

  const etapa = await prisma.etapa.update({
    where: { id: etapaId },
    data: {
      status,
    },
  });

  res.json(etapa);
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta http://localhost:3333");
});