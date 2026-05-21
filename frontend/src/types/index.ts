// src/types/index.ts

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export type NivelPermissao =
  | "Admin"
  | "Engenheiro"
  | "Operador";

export type ResultadoTeste =
  | "Aprovado"
  | "Reprovado";

export type StatusEtapa =
  | "Pendente"
  | "Andamento"
  | "Concluida";

export type StatusPeca =
  | "EmProducao"
  | "EmTransporte"
  | "Pronta";

export type TipoAeronave =
  | "Comercial"
  | "Militar";

export type TipoPeca =
  | "Nacional"
  | "Importada";

export type TipoTeste =
  | "Eletrico"
  | "Hidraulico"
  | "Aerodinamico";


// ─────────────────────────────────────────────────────────────
// MODELS
// ─────────────────────────────────────────────────────────────

export type Funcionario = {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;

  etapas?: Etapa[];
};

export type Etapa = {
  id: number;
  nome: string;

  // DateTime do Prisma normalmente chega como string no frontend
  prazo: string;

  status: StatusEtapa;

  aeronaveId: number;

  aeronave?: Aeronave;

  funcionarios: Funcionario[];
};

export type Peca = {
  id: number;
  nome: string;

  tipo: TipoPeca;

  status: StatusPeca;

  fornecedor: string;

  aeronaveId: number;

  aeronave?: Aeronave;
};

export type Teste = {
  id: number;

  tipo: TipoTeste;

  resultado: ResultadoTeste;

  aeronaveId: number;

  aeronave?: Aeronave;
};

export type Aeronave = {
  id: number;

  codigo: string;

  modelo: string;

  tipo: TipoAeronave;

  capacidade: number;

  alcance: number;

  pecas: Peca[];

  etapas: Etapa[];

  testes: Teste[];
};