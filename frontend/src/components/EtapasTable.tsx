import { useState } from "react";
import { EtapaModal } from "../modals/EtapaModal";
import { CadEtapaModal } from "../modals/CadEtapaModal";

type StatusEtapa = "em_andamento" | "concluida" | "pendente";
interface Etapa {
  id: number;
  nome: string;
  prazo: string;
  status: StatusEtapa;
}

const etapasIniciais: Etapa[] = [
  { id: 1, nome: "Etapa inicial", prazo: "12/12/2026", status: "em_andamento" },
];

function StatusEtapaBadge({ status }: { status: StatusEtapa }) {
  const map: Record<StatusEtapa, { label: string; className: string }> = {
    em_andamento: { label: "Em andamento", className: "text-amber-700" },
    concluida: { label: "Concluída", className: "text-emerald-700" },
    pendente: { label: "Pendente", className: "text-slate-600" },
  };
  const { label, className } = map[status];
  return <span className={`text-sm px-2 py-0.5 rounded-md font-medium ${className}`}>{label}</span>;
}

export default function EtapasTable() {
    const [etapas] = useState<Etapa[]>(etapasIniciais);
    const [open, setOpen] = useState(false);
    const [openCadastro, setOpenCadastro] = useState(false);
    
    return (
        <div>
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-800">Etapas</h2>
        <button onClick={() => setOpenCadastro(true)} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-xs font-medium px-4 py-1.5 rounded-xl transition-colors cursor-pointer">
            Nova etapa
        </button>
        {<CadEtapaModal isOpen={openCadastro} onClose={() => {}} />}
        {openCadastro && (
          <CadEtapaModal
            isOpen={openCadastro}
            onClose={() => setOpenCadastro(false)}
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
              <span className="text-sm text-slate-600">{etapa.prazo}</span>
              <StatusEtapaBadge status={etapa.status} />
              <button 
              onClick={() => setOpen(true)}
              className="cursor-pointer justify-self-start border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
                Ver
              </button>
            </div>
          ))}
          {open && (
            <EtapaModal
              etapa={{ nome: "Nome", prazo: "12/04/2026", status: "pendente" }}
              onClose={() => setOpen(false)}
            />
          )}

          {etapas.length === 0 && (
            <p className="text-sm text-slate-400 italic pt-4 text-center">Nenhuma etapa cadastrada.</p>
          )}
        </section>
        </div>
    );
}