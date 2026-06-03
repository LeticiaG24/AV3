import { useState } from "react";

type Tipo = "Comercial" | "Militar" | "";

interface AeronaveForm {
  modelo: string;
  codigo: string;
  capacidade: string;
  alcance: string;
  tipo: Tipo;
}

interface CadAeronaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarAeronaves: () => Promise<void>;
}

export function CadAeronaveModal({
  isOpen,
  onClose,
  atualizarAeronaves,
}: CadAeronaveModalProps) {
  const [form, setForm] = useState<AeronaveForm>({
    modelo: "",
    codigo: "",
    capacidade: "",
    alcance: "",
    tipo: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [erro, setErro] = useState<string>("");

    async function handleSubmit() {
      // Validação local
      if (!form.modelo || !form.codigo || !form.capacidade || !form.alcance || !form.tipo) {
        setErro("Preencha todos os campos antes de cadastrar.");
        return;
      }

      try {
        setLoading(true);
        setErro("");

        const response = await fetch("http://localhost:3333/aeronaves", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            modelo: form.modelo,
            codigo: form.codigo,
            capacidade: Number(form.capacidade),
            alcance: Number(form.alcance),
            tipo: form.tipo,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          // Código duplicado — ajusta a string conforme o que seu backend retorna
          if (response.status === 409 || data?.message?.includes("codigo")) {
            setErro("Já existe uma aeronave com esse código.");
          } else {
            setErro("Erro ao cadastrar aeronave. Tente novamente.");
          }
          return;
        }

        setForm({ modelo: "", codigo: "", capacidade: "", alcance: "", tipo: "" });
        await atualizarAeronaves();
        onClose();
      } catch (error) {
        setErro("Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#e8eaed] px-8 py-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-300 hover:text-gray-600 cursor-pointer"
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-gray-700">
          Cadastrar Aeronave
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          <input
            type="number"
            name="capacidade"
            placeholder="Capacidade"
            value={form.capacidade}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          <input
            type="number"
            name="alcance"
            placeholder="Alcance"
            value={form.alcance}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          <div className="relative">
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm outline-none transition focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
            >
              <option value="" disabled>
                Tipo de aeronave
              </option>

              <option value="Comercial" className="text-gray-700">
                Comercial
              </option>

              <option value="Militar" className="text-gray-700">
                Militar
              </option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {erro && (
            <p className="text-center text-xs text-red-500 mt-4">{erro}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-[#3d5a80] px-10 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#2e4669] active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
}