import AeronaveCard from "../components/AeronaveCard";
import Header from "../components/Header";
import CadFuncionarioBtn from "../components/CadFuncionarioBtn";
import CadAeronaveBtn from "../components/CadAeronaveBtn";
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

          <div className="flex gap-3">
            {usuario.nivel === "Admin"? <CadFuncionarioBtn />: null}
            {usuario.nivel === "Operador"? null: <CadAeronaveBtn />}
          </div>
        </section>

        {/* Aeronaves */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Aeronaves</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AeronaveCard />
            <AeronaveCard />
          </div>
        </section>

        {/* Funcionários */}
        {usuario.nivel === "Admin"? <FuncionariosTable />: null}

      </main>
    </div>
  );
}