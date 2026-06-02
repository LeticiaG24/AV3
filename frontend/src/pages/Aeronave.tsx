import Header from "../components/Header";
import Testes from "../components/Testes";
import EtapasTable from "../components/EtapasTable";
import PecasTable from "../components/PecasTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Aeronave, Peca } from "../types/index";

function gerarRelatorio(aeronave: Aeronave, pecas: Peca[]) {
  const linhas = [
    `RELATÓRIO DE AERONAVE`,
    `Gerado em: ${new Date().toLocaleString("pt-BR")}`,
    ``,
    `=== DADOS GERAIS ===`,
    `Modelo:     ${aeronave.modelo}`,
    `Código:     ${aeronave.codigo}`,
    `Tipo:       ${aeronave.tipo}`,
    `Capacidade: ${aeronave.capacidade}`,
    `Alcance:    ${aeronave.alcance}`,
    ``,
    `=== PEÇAS (${pecas.length}) ===`,
    ...pecas.map(
      (p) => `- ${p.nome} | ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`
    ),
    ``,
    `=== TESTES (${aeronave.testes.length}) ===`,
    ...aeronave.testes.map(
      (t) => `- ${t.tipo} | Status: ${t.resultado}`
    ),
    ``,
    `=== ETAPAS (${aeronave.etapas.length}) ===`,
    ...aeronave.etapas.map(
      (e) => `- ${e.nome} | Status: ${e.status}`
    ),
  ];

  const conteudo = linhas.join("\n");
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio_${aeronave.codigo}.txt`;
  link.click();

  URL.revokeObjectURL(url);
}

export default function Aeronave() {
  const { id } = useParams();

  const [aeronave, setAeronave] = useState<Aeronave | null>(null);
  const [pecas, setPecas] = useState<Peca[]>([]);

  async function carregarAeronave() {
    const response = await fetch(`http://localhost:3333/aeronaves/${id}`);
    const data = await response.json();

    setAeronave(data);
    setPecas(data.pecas);
  }

  useEffect(() => {
    carregarAeronave().catch((error) =>
      console.error("Erro ao buscar aeronave:", error)
    );
  }, [id]);

  if (!aeronave) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-6 space-y-6">
        {/* Top section: Modelo | Testes | Relatório */}
        <div className="grid grid-cols-3 gap-4">

          {/* Modelo */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4">
            <h2 className="text-base font-semibold text-slate-800 underline underline-offset-2 mb-3">
              {aeronave.modelo}
            </h2>
            <div className="space-y-1.5">
              {[
                { label: "Código", value: aeronave.codigo },
                { label: "Tipo", value: aeronave.tipo },
                { label: "Capacidade", value: aeronave.capacidade },
                { label: "Alcance", value: aeronave.alcance },
              ].map(({ label, value }) => (
                <div key={label} className="text-sm">
                  <span className="text-slate-500">{label}: </span>
                  <span className="text-slate-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Testes testes={aeronave.testes} onStatusChange={carregarAeronave}/>

          {/* Relatório */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-2">Relatório</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gerar um relatório completo da aeronave para análise e controle.
              </p>
            </div>
            <button
              onClick={() => gerarRelatorio(aeronave, pecas)}
              className="mt-4 w-full bg-[#4a7ba7] hover:bg-[#3d6b93] active:bg-[#2f5578] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Gerar relatório (.txt)
            </button>
          </div>
        </div>

        {/* resto da tela */}

        <PecasTable
          pecas={pecas}
          atualizarPecas={carregarAeronave}
          aeronaveId={id!}  // id vem do useParams
        />

        <EtapasTable etapas={aeronave.etapas} />
      </main>
    </div>
  );
}