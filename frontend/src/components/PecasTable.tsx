import { useState } from "react";
import { CadPecaModal } from "../modals/cadPecaModal";
import { Pencil } from "lucide-react";
import { AlterarStatusPecaModal } from "../modals/AlterarStatusPecaModal";

type StatusPeca = "em_producao" | "em_transporte" | "pronta";

interface Peca {
  id: number;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: StatusPeca;
}

const pecasIniciais: Peca[] = [
  { id: 1, nome: "Turbina A1", tipo: "Nacional", fornecedor: "GE Aviation", status: "em_producao" },
  { id: 2, nome: "Flap Esquerdo", tipo: "Importada", fornecedor: "Embraer Parts", status: "em_transporte" },
];

function PecaCard({ peca }: { peca: Peca }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm space-y-0.5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-base leading-tight">
          {peca.nome}
        </h3>
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          < Pencil size={16}/>
        </button>
        <AlterarStatusPecaModal isOpen={open} onClose={() => setOpen(false)} statusAtual={peca.status} onConfirm={(novoStatus) => {
          console.log(novoStatus);
        }} />
        {open && (
          <AlterarStatusPecaModal
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
      <p className="text-slate-500">{peca.tipo}</p>
      <p className="text-slate-500">{peca.fornecedor}</p>
    </div>
  );
}

export default function PecasTable() {
    const [open, setOpen] = useState(false);
    const [pecas] = useState<Peca[]>(pecasIniciais);
    const pecasPorStatus = (status: StatusPeca) => pecas.filter((p) => p.status === status);
    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold text-slate-800">Peças</h2>
            <button onClick={() => setOpen(true)} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-xs font-medium px-4 py-1.5 rounded-xl transition-colors cursor-pointer">
              Nova peça
            </button>
            {open && (
              <CadPecaModal
                isOpen={open}
                onClose={() => setOpen(false)}
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Em produção */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Em produção
              </p>
              <div className="space-y-2">
                {pecasPorStatus("em_producao").length > 0
                  ? pecasPorStatus("em_producao").map((p) => <PecaCard key={p.id} peca={p} />)
                  : <p className="text-xs text-slate-400 italic">Nenhuma</p>}
              </div>
            </div>

            {/* Em transporte */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Em transporte
              </p>
              <div className="space-y-2">
                {pecasPorStatus("em_transporte").length > 0
                  ? pecasPorStatus("em_transporte").map((p) => <PecaCard key={p.id} peca={p} />)
                  : <p className="text-xs text-slate-400 italic">Nenhuma</p>}
              </div>
            </div>

            {/* Pronta */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Pronta
              </p>
              <div className="space-y-2">
                {pecasPorStatus("pronta").length > 0
                  ? pecasPorStatus("pronta").map((p) => <PecaCard key={p.id} peca={p} />)
                  : <p className="text-xs text-slate-400 italic">Nenhuma</p>}
              </div>
            </div>
          </div>
        </section>
    );
}