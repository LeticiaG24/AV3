import { useState } from "react";
import { AdicionarFuncionarioDropdown, type Funcionario } from "../components/AdicionarFuncionarioDropdown";

type StatusEtapa = "em_andamento" | "concluida" | "pendente";

interface Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
}

interface EtapaModalProps {
  etapa?: Etapa;
  onClose: () => void;
}

const statusLabels: Record<StatusEtapa, string> = {
  em_andamento: "Em andamento",
  concluida: "Concluída",
  pendente: "Pendente",
};

// ── Icons ──────────────────────────────────────────────────────────────────────

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Componente ─────────────────────────────────────────────────────────────────

export function EtapaModal({ etapa, onClose }: EtapaModalProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nome: "Júlia Costa Silva", nivel: "Engenheiro", telefone: "(12) 99999-9999" },
  ]);
  const [status, setStatus] = useState<StatusEtapa>(etapa?.status ?? "pendente");

  const etapaData: Etapa = etapa ?? { nome: "Nome", prazo: "12/04/2026", status: "pendente" };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-100 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
          <XIcon className="w-4 h-4" />
        </button>

        {/* Etapa info */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">{etapaData.nome}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{etapaData.prazo}</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">{statusLabels[status]}</p>
        </div>

        {/* Botão de status */}
        <button
          onClick={() => status === "pendente" ? setStatus("em_andamento") : setStatus("concluida")}
          disabled={status === "concluida"}
          className="bg-[#4a7ba7] hover:bg-[#3d6b93] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors shadow-sm mb-6 cursor-pointer"
        >
          {status === "pendente" ? "Iniciar etapa" : status === "em_andamento" ? "Finalizar etapa" : "Concluída"}
        </button>

        {/* Funcionários */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div />
            <AdicionarFuncionarioDropdown
              funcionariosJaAdicionados={funcionarios.map((f) => f.id)}
              onAdicionar={(f) => setFuncionarios((prev) => [...prev, f])}
            />
          </div>

          <div className="bg-white border-2 border-[#4a7ba7]/40 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-slate-100">
              {["Nome", "Nível", "Telefone"].map((col) => (
                <span key={col} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{col}</span>
              ))}
            </div>

            {funcionarios.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-4">Nenhum funcionário adicionado.</p>
            ) : (
              funcionarios.map((f, idx) => (
                <div
                  key={f.id}
                  className={`grid grid-cols-3 px-4 py-3 items-center group hover:bg-slate-50 transition-colors ${idx < funcionarios.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <span className="text-sm text-slate-800">{f.nome}</span>
                  <span className="text-sm text-slate-600">{f.nivel}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{f.telefone}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}