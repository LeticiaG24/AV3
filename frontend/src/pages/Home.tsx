import AeronaveCard from "../components/AeronaveCard";
import Header from "../components/Header";
import FuncionariosTable from "../components/FuncionariosTable";

type Usuario = {
  nome: string;
  nivel: string;
}

export default function Home(usuario: Usuario) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-10">

        {/* User info + action buttons */}
        <section className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-800">{usuario.nome}</p>
            <p className="text-sm text-slate-500 mt-0.5">{usuario.nivel}</p>
          </div>
        </section>

        {/* Aeronaves */}
        <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Aeronaves</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AeronaveCard />
            <AeronaveCard />
          </div>
        </section>

        {/* Funcionários */}
        {usuario.nivel === "Operador"? null:
        <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <FuncionariosTable />
        </section>}

      </main>
    </div>
  );
}
