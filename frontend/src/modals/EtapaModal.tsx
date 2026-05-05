import { useState } from "react";

type StatusEtapa = "em_andamento" | "concluida" | "pendente";

interface Funcionario {
  id: number;
  nome: string;
  nivel: string;
  telefone: string;
}

interface Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
}

interface EtapaModalProps {
  etapa?: Etapa;
  onClose: () => void;
}

const funcionariosIniciais: Funcionario[] = [
  { id: 1, nome: "Júlia Costa Silva", nivel: "Engenheiro", telefone: "(12) 99999-9999" },
];

const statusLabels: Record<StatusEtapa, string> = {
  em_andamento: "Em andamento",
  concluida: "Concluída",
  pendente: "Pendente",
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
    </svg>
  );
}

export function EtapaModal({ etapa, onClose }: EtapaModalProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(funcionariosIniciais);
  const [status, setStatus] = useState<StatusEtapa>(etapa?.status ?? "pendente");

  const etapaData: Etapa = etapa ?? {
    nome: "Nome",
    prazo: "12/04/2026",
    status: "pendente",
  };

  const handleIniciar = () => setStatus("em_andamento");
  const handleFinalizar = () => setStatus("concluida");

  const handleRemoverFuncionario = (id: number) => {
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="bg-slate-100 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {/* Etapa info */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">{etapaData.nome}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{etapaData.prazo}</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">
            {statusLabels[status]}
          </p>
        </div>

        {/* Iniciar etapa button */}
        <button
          onClick={status === "pendente" ? handleIniciar : handleFinalizar}
          disabled={status === "concluida"}
          className="bg-[#4a7ba7] hover:bg-[#3d6b93] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors shadow-sm mb-6"
        >
          {status === "pendente" ? "Iniciar etapa" : "Finalizar etapa"}
        </button>

        {/* Funcionários section */}
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div /> {/* spacer */}
            <button className="flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-sm">
              <UserPlusIcon className="w-3.5 h-3.5" />
              Adicionar funcionário
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border-2 border-[#4a7ba7]/40 rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-slate-100">
              {["Nome", "Nível", "Telefone"].map((col) => (
                <span key={col} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {funcionarios.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-4">
                Nenhum funcionário adicionado.
              </p>
            ) : (
              funcionarios.map((f, idx) => (
                <div
                  key={f.id}
                  className={`grid grid-cols-3 px-4 py-3 items-center group hover:bg-slate-50 transition-colors ${
                    idx < funcionarios.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <span className="text-sm text-slate-800">{f.nome}</span>
                  <span className="text-sm text-slate-600">{f.nivel}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{f.telefone}</span>
                    <button
                      onClick={() => handleRemoverFuncionario(f.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all ml-1"
                      title="Remover"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </button>
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
