import { useState } from "react";

type Permissao = "Admin" | "Engenheiro" | "Operador" | "";

interface FuncionarioForm {
  nome: string;
  endereco: string;
  usuario: string;
  senha: string;
  telefone: string;
  permissao: Permissao;
}

interface CadastrarFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function CadFuncionarioModal({
  isOpen,
  onClose,
  onSubmit,
}: CadastrarFuncionarioModalProps) {
  const [form, setForm] = useState<FuncionarioForm>({
    nome: "",
    endereco: "",
    usuario: "",
    senha: "",
    telefone: "",
    permissao: "",
  });

  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3333/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          endereco: form.endereco,
          usuario: form.usuario,
          senha: form.senha,
          telefone: form.telefone,
          nivelPermissao: form.permissao,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar aeronave");
      }
      await onSubmit?.();

      // fecha modal
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
          Cadastrar Funcionário
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

          {/* Endereço */}
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          {/* Usuário */}
          <input
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={form.usuario}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          {/* Senha */}
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
          />

          {/* Telefone + Permissão */}
          <div className="flex gap-3">
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-1/2 rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
            />

            <div className="relative w-1/2">
              <select
                name="permissao"
                value={form.permissao}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-transparent bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm outline-none transition focus:border-[#3d5a80] focus:ring-2 focus:ring-[#3d5a80]/20"
              >
                <option value="" disabled>
                  Permissão
                </option>
                <option value="Admin" className="text-gray-700">
                  Admin
                </option>
                <option value="Engenheiro" className="text-gray-700">
                  Engenheiro
                </option>
                <option value="Operador" className="text-gray-700">
                  Operador
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
            disabled={loading}
            className="rounded-lg bg-[#3d5a80] px-10 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#2e4669] active:scale-95 cursor-pointer"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
}