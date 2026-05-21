import { useState } from "react";
import type { ResultadoTeste, Teste } from "../types";

interface ResultadoTesteModalProps {
  isOpen: boolean;
  onClose: () => void;
  teste: Teste | null;
  onConfirm?: (resultado: ResultadoTeste) => void;
  onStatusChange: () => Promise<void>;
}

export function ResultadoTesteModal({
  isOpen,
  onClose,
  teste,
  onConfirm,
  onStatusChange,
}: ResultadoTesteModalProps) {

  if (!teste) return null;

  const [, setSelecionado] = useState<ResultadoTeste>(teste.resultado);

  if (!isOpen) return null;

  const handleSelect = async (resultado: ResultadoTeste) => {
    setSelecionado(resultado);

    await fetch(`http://localhost:3333/testes/${teste.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resultado,
      }),
    });

    // callback opcional
    onConfirm?.(resultado);

    // recarrega os dados
    await onStatusChange();

    // fecha modal
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#e8eaed] px-6 py-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4 text-center text-sm font-medium text-gray-600">
          Selecione o resultado do teste
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleSelect("Aprovado")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-transparent bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-green-400 hover:bg-green-50 hover:text-green-700 active:scale-95"
          >
            <span className="text-green-500">✓</span>
            Aprovado
          </button>

          <button
            onClick={() => handleSelect("Reprovado")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-transparent bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-red-400 hover:bg-red-50 hover:text-red-700 active:scale-95"
          >
            <span className="text-red-500">✕</span>
            Reprovado
          </button>
        </div>
      </div>
    </div>
  );
}