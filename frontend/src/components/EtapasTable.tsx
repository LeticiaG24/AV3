import { useState } from "react";
import { EtapaModal } from "../modals/EtapaModal";
import { CadEtapaModal } from "../modals/CadEtapaModal";
import type { Etapa } from "../types";


type Props = {
  etapas: Etapa[];
  aeronaveId: string | number;
  atualizarEtapas: () => Promise<void>;
}

function StatusEtapaBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    Andamento: { label: "Em andamento", className: "text-amber-700" },
    Concluida: { label: "Concluída", className: "text-emerald-700" },
    Pendente: { label: "Pendente", className: "text-slate-600" },
  };
  const { label, className } = map[status];
  return <span className={`text-sm px-2 py-0.5 rounded-md font-medium ${className}`}>{label}</span>;
}

export default function EtapasTable({ etapas, aeronaveId, atualizarEtapas }: Props) {
    const [etapaSelecionada, setEtapaSelecionada] = useState<Etapa | null>(null);
    const [openCadastro, setOpenCadastro] = useState(false);
    
    return (
        <div>
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-800">Etapas</h2>
        <button onClick={() => setOpenCadastro(true)} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-xs font-medium px-4 py-1.5 rounded-xl transition-colors cursor-pointer">
            Nova etapa
        </button>
          {openCadastro && (
            <CadEtapaModal
              isOpen={openCadastro}
              onClose={() => setOpenCadastro(false)}
              aeronaveId={aeronaveId}
              onSuccess={atualizarEtapas}
            />
          )}
        </div>
        <div className="grid grid-cols-4 pb-2 border-b border-slate-200">
            {["Nome", "Prazo", "Status", "Visualizar"].map((col) => (
              <span key={col} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {col}
              </span>
            ))}
          </div>

          {etapas.map((etapa, idx) => (
            <div
              key={etapa.id}
              className={`grid grid-cols-4 py-3 items-center ${
                idx < etapas.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <span className="text-sm text-slate-800">{etapa.nome}</span>
              <span className="text-sm text-slate-600">{new Date(etapa.prazo).toLocaleDateString("pt-BR")}</span>
              <StatusEtapaBadge status={etapa.status} />
              <button 
                onClick={() => setEtapaSelecionada(etapa)}
                className="cursor-pointer justify-self-start border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
                Ver
              </button>
            </div>
          ))}
          {etapaSelecionada && (
            <EtapaModal
              etapa={etapaSelecionada}
              onClose={() => setEtapaSelecionada(null)}
            />
          )}

          {etapas.length === 0 && (
            <p className="text-sm text-slate-400 italic pt-4 text-center">Nenhuma etapa cadastrada.</p>
          )}
        </section>
        </div>
    );
}