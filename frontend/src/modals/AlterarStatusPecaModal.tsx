import { useState } from "react";

interface StatusOption {
  value: string;
  label: string;
  icon: string;
  activeColor: string;
  hoverBorder: string;
  hoverBg: string;
  hoverText: string;
  iconColor: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "EmProducao",
    label: "Em Produção",
    icon: "⚙️",
    activeColor: "border-orange-400 bg-orange-50 text-orange-700",
    hoverBorder: "hover:border-orange-400",
    hoverBg: "hover:bg-orange-50",
    hoverText: "hover:text-orange-700",
    iconColor: "",
  },
  {
    value: "EmTransporte",
    label: "Em Transporte",
    icon: "🚚",
    activeColor: "border-blue-400 bg-blue-50 text-blue-700",
    hoverBorder: "hover:border-blue-400",
    hoverBg: "hover:bg-blue-50",
    hoverText: "hover:text-blue-700",
    iconColor: "",
  },
  {
    value: "Pronta",
    label: "Pronta",
    icon: "✓",
    activeColor: "border-green-400 bg-green-50 text-green-700",
    hoverBorder: "hover:border-green-400",
    hoverBg: "hover:bg-green-50",
    hoverText: "hover:text-green-700",
    iconColor: "text-green-500",
  },
];

type Peca = {
  id: number;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
};

interface AlterarStatusPecaModalProps {
  isOpen: boolean;
  onClose: () => void;
  peca: Peca;
  onConfirm?: (novoStatus: string) => void;
}

export function AlterarStatusPecaModal({
  isOpen,
  onClose,
  peca,
  onConfirm,
}: AlterarStatusPecaModalProps) {
  
  const [selecionado, setSelecionado] = useState<string>(peca.status);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selecionado) return;

    onConfirm?.(selecionado);
    onClose();
  };
  
  const ORDEM: Record<string, number> = {
    EmProducao: 0,
    EmTransporte: 1,
    Pronta: 2,
  };
  const opcoesFiltradas = STATUS_OPTIONS.filter(
    (option) => ORDEM[option.value] >= ORDEM[peca.status]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#e8eaed] px-6 py-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-300 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <p className="mb-2 text-center text-sm font-medium text-gray-600">
          Alterar status da peça
        </p>

        <p className="mb-5 text-center text-xs text-gray-500">
          {peca.nome}
        </p>

        <div className="flex flex-col gap-2.5">
          {opcoesFiltradas.map((option) => {
            const isSelected = selecionado === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setSelecionado(option.value)}
                className={`flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition active:scale-95 cursor-pointer
                  ${
                    isSelected
                      ? option.activeColor + " border"
                      : `border-transparent ${option.hoverBorder} ${option.hoverBg} ${option.hoverText}`
                  }`}
              >
                <span className={option.iconColor || ""}>
                  {option.icon}
                </span>

                {option.label}

                {isSelected && (
                  <span className="ml-auto text-xs opacity-60">✓</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!selecionado}
            className="rounded-lg bg-[#3d5a80] px-10 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#2e4669] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}