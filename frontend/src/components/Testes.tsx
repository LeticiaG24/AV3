import { useState } from "react";
import { ResultadoTesteModal } from "../modals/ResultadoTesteModal";
import { Check, X, Circle } from "lucide-react";

import type { Teste, ResultadoTeste, TipoTeste } from "../types";

type Props = {
  testes: Teste[];
  onStatusChange: () => Promise<void>;
};

function CheckIcon({ className }: { className?: string }) {
  return <Check className={className} />;
}

function XIcon({ className }: { className?: string }) {
  return <X className={className} />;
}

function CircleIcon({ className }: { className?: string }) {
  return <Circle className={className} />;
}

function TesteStatusIcon({ status }: { status: ResultadoTeste | null }) {
  if (status === "Aprovado") {
    return <CheckIcon className="w-5 h-5 text-emerald-500" />;
  }

  if (status === "Reprovado") {
    return <XIcon className="w-5 h-5 text-red-500" />;
  }

  return <CircleIcon className="w-5 h-5 text-slate-400" />;
}

function TesteTipo({ tipo }: { tipo: TipoTeste }) {
  if (tipo === "Aerodinamico") {
    return <span>Aerodinâmico</span>
  }
  if (tipo === "Eletrico") {
    return <span>Elétrico</span>
  }
  if (tipo === "Hidraulico") {
    return <span>Hidráulico</span>
  }
}

export default function Testes({ testes, onStatusChange }: Props) {
  const [open, setOpen] = useState(false);
  const [testeSelecionado, setTesteSelecionado] = useState<Teste | null>(null);

  function handleOpenModal(teste: Teste) {
    setTesteSelecionado(teste);
    setOpen(true);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800 mb-3">
        Testes
      </h2>

      <div className="space-y-2.5">
        {testes.map((teste) => (
          <div
            key={teste.id}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-slate-700">
              {TesteTipo(teste)}
            </span>

            <button
              onClick={() => handleOpenModal(teste)}
              className="cursor-pointer"
            >
              <TesteStatusIcon status={teste.resultado} />
            </button>
          </div>
        ))}
      </div>

      <ResultadoTesteModal
        isOpen={open}
        teste={testeSelecionado}
        onClose={() => setOpen(false)}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}