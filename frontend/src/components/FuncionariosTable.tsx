interface Funcionario {
  id: number;
  nome: string;
  nivel: string;
  telefone: string;
  endereco: string;
}

const funcionarios: Funcionario[] = [
  {
    id: 1,
    nome: "Júlia Costa Silva",
    nivel: "Engenheiro",
    telefone: "(12) 99999-9999",
    endereco: "Jardins, Av. Python 123",
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    nivel: "Técnico",
    telefone: "(11) 98888-7777",
    endereco: "Vila Nova, R. Kotlin 45",
  },
];

export default function FuncionariosTable() {
    return (
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Funcionários</h2>
          <div className="bg-[#1e3a5f] rounded-2xl overflow-hidden shadow-md">
            {/* Table header */}
            <div className="grid grid-cols-4 px-6 py-3 border-b border-white/10">
              {["Nome", "Nível", "Telefone", "Endereço"].map((col) => (
                <span key={col} className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {col}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {funcionarios.map((f, idx) => (
              <div
                key={f.id}
                className={`grid grid-cols-4 px-6 py-4 items-center hover:bg-white/5 transition-colors ${
                  idx < funcionarios.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-sm text-white font-medium">{f.nome}</span>
                <span className="text-sm text-slate-300">{f.nivel}</span>
                <span className="text-sm text-slate-300">{f.telefone}</span>
                <span className="text-sm text-slate-300">{f.endereco}</span>
              </div>
            ))}
          </div>
        </section>
    );
}