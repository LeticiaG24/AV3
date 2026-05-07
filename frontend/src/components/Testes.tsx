import { useState } from "react";
import { ResultadoTesteModal } from "../modals/ResultadoTesteModal";
import { Check, X, Circle } from "lucide-react";

type StatusTeste = "aprovado" | "reprovado" | null;
interface Teste {
  id: number;
  nome: string;
  status: StatusTeste;
}


const testesIniciais: Teste[] = [
  { id: 1, nome: "Hidráulico", status: "aprovado" },
  { id: 2, nome: "Elétrico", status: null },
  { id: 3, nome: "Aerodinâmico", status: "reprovado" },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    < Check className={className} />
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    < X className={className} />
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    < Circle className={className} />
  );
}


function TesteStatusIcon({ status }: { status: StatusTeste }) {
  if (status === "aprovado") return <CheckIcon className="w-5 h-5 text-emerald-500" />;
  if (status === "reprovado") return <XIcon className="w-5 h-5 text-red-500" />;
  return <CircleIcon className="w-5 h-5 text-slate-400" />;
}


export default function Testes() {
  const [testes] = useState<Teste[]>(testesIniciais);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800 mb-3">Testes</h2>
      <div className="space-y-2.5">
        {testes.map((teste) => (
          <div key={teste.id} className="flex items-center justify-between">
            <span className="text-sm text-slate-700">{teste.nome}</span>
            <button onClick={() => setOpen(true)} className="cursor-pointer">
            <TesteStatusIcon status={teste.status} />
            </button>
            <ResultadoTesteModal
              isOpen={open}
              onClose={() => setOpen(false)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}