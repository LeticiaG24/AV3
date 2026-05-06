import { useState } from "react";

type Resultado = "aprovado" | "reprovado" | null;

interface ResultadoTesteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (resultado: Resultado) => void;
}

export function ResultadoTesteModal({
  isOpen,
  onClose,
  onConfirm,
}: ResultadoTesteModalProps) {
  const [, setSelecionado] = useState<Resultado>(null);

  if (!isOpen) return null;

  const handleSelect = (resultado: Resultado) => {
    setSelecionado(resultado);
    onConfirm?.(resultado);
    onClose();
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#e8eaed] px-6 py-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <p className="mb-4 text-center text-sm font-medium text-gray-600">
          Selecione o resultado do teste
        </p>

        {/* Botões */}
        <div className="flex gap-3">
          {/* Aprovado */}
          <button
            onClick={() => handleSelect("aprovado")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-transparent bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-green-400 hover:bg-green-50 hover:text-green-700 active:scale-95"
          >
            <span className="text-green-500">✓</span>
            Aprovado
          </button>

          {/* Reprovado */}
          <button
            onClick={() => handleSelect("reprovado")}
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