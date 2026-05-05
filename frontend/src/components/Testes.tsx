import { useState } from "react";

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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}


function TesteStatusIcon({ status }: { status: StatusTeste }) {
  if (status === "aprovado") return <CheckIcon className="w-5 h-5 text-emerald-500" />;
  if (status === "reprovado") return <XIcon className="w-5 h-5 text-red-500" />;
  return <CircleIcon className="w-5 h-5 text-slate-400" />;
}


export default function Testes() {
  const [testes] = useState<Teste[]>(testesIniciais);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800 mb-3">Testes</h2>
      <div className="space-y-2.5">
        {testes.map((teste) => (
          <div key={teste.id} className="flex items-center justify-between">
            <span className="text-sm text-slate-700">{teste.nome}</span>
            <TesteStatusIcon status={teste.status} />
          </div>
        ))}
      </div>
    </div>
  );
}