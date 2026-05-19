import CadFuncionarioBtn from "./CadFuncionarioBtn";

type Funcionario = {
    id: number;
    nome: string
    telefone: string
    endereco: string
    usuario: string
    senha: string
    nivelPermissao: string;
};

type Props = {
  funcionarios?: Funcionario[];
};

export default function FuncionariosTable({
  funcionarios = [],
}: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Funcionários
        </h2>

        <CadFuncionarioBtn />
      </div>

      <div className="bg-[#1e3a5f] rounded-2xl overflow-hidden shadow-md overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-4 min-w-[700px] px-6 py-3 border-b border-white/10">
          {["Nome", "Nível", "Telefone", "Endereço"].map((col) => (
            <span
              key={col}
              className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Empty state */}
        {funcionarios.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-300">
            Nenhum funcionário encontrado.
          </div>
        ) : (
          funcionarios.map((f, idx) => (
            <div
              key={f.id}
              className={`grid grid-cols-4 min-w-[700px] px-6 py-4 items-center hover:bg-white/5 transition-colors ${
                idx < funcionarios.length - 1
                  ? "border-b border-white/10"
                  : ""
              }`}
            >
              <span className="text-sm text-white font-medium">
                {f.nome}
              </span>

              <span className="text-sm text-slate-300">
                {f.nivelPermissao}
              </span>

              <span className="text-sm text-slate-300">
                {f.telefone}
              </span>

              <span className="text-sm text-slate-300 truncate">
                {f.endereco}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}