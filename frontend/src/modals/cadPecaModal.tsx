import { useState } from "react";

type TipoPeca = "Nacional" | "Importada" | "";
type StatusPeca = "EmProducao" | "EmTransporte" | "Pronta" | "";


interface PecaForm {
    nome: string;
    fornecedor: string;
    tipo: TipoPeca;
    status: StatusPeca;
}

interface CadastrarPecaModalProps {
  isOpen: boolean;
  onClose: () => void;
  aeronaveId: string | number;
  onSuccess?: () => Promise<void>; // chama carregarAeronave após cadastro
}

export function CadPecaModal({ isOpen, onClose, aeronaveId, onSuccess }: CadastrarPecaModalProps) {
  const [form, setForm] = useState<PecaForm>({ nome: "", fornecedor: "", tipo: "", status: "" });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:3333/pecas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, aeronaveId }),
    });
    setForm({ nome: "", fornecedor: "", tipo: "", status: "" }); // limpa o form
    onClose();
    await onSuccess?.();
  };
  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#e8eaed] px-8 py-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-300 hover:text-gray-600 cursor-pointer"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-gray-700">
          Cadastrar Peça
        </h2>

        {/* Campos */}
        <div className="flex flex-col gap-3">
          {/* Nome */}
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          {/* Fornecedor */}
          <input
            type="text"
            name="fornecedor"
            placeholder="Fornecedor"
            value={form.fornecedor}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          {/* Tipo + Status */}
          <div className="flex gap-3">
            <div className="relative w-1/2">
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm outline-none transition focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
              >
                <option value="" disabled>
                  Tipo
                </option>
                <option value="Nacional" className="text-gray-700">
                  Nacional
                </option>
                <option value="Importada" className="text-gray-700">
                  Importada
                </option>
              </select>
              {/* Ícone seta */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
            <div className="relative w-1/2">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm outline-none transition focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="EmProducao" className="text-gray-700">
                  Em produção
                </option>
                <option value="EmTransporte" className="text-gray-700">
                  Em transporte
                </option>
                <option value="Pronta" className="text-gray-700">
                    Pronta
                </option>
              </select>
              {/* Ícone seta */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Botão Cadastrar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-[#3d5a80] px-10 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#2e4669] active:scale-95 cursor-pointer"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}