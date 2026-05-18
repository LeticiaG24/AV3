import AeronaveCard from "../components/AeronaveCard";
import Header from "../components/Header";
import FuncionariosTable from "../components/FuncionariosTable";
import CadAeronaveBtn from "../components/CadAeronaveBtn";
import { useEffect, useState } from "react";

type Usuario = {
  nome: string;
  nivel: string;
}
type Aeronave = {
  id: number;
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
};

export default function Home(usuario: Usuario) {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);

  useEffect(() => {
    async function fetchAeronaves() {
      const response = await fetch("http://localhost:3333/aeronaves");

      const data = await response.json();

      setAeronaves(data);
    }

    fetchAeronaves();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-5">

        {/* User info + action buttons */}
        <section className="flex items-center justify-between mb-10">
          <div>
            <p className="text-lg font-semibold text-slate-800">{usuario.nome}</p>
            <p className="text-sm text-slate-500 mt-0.5">{usuario.nivel}</p>
          </div>
        </section>

        {/* Aeronaves */}
        <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Aeronaves</h2>
            {usuario.nivel === "Operador" ? null :
            <CadAeronaveBtn />}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aeronaves.map((aeronave) => (
              <AeronaveCard
                key={aeronave.id}
                aeronave={aeronave}
              />
            ))}
          </div>
        </section>

        {/* Funcionários */}
        {usuario.nivel !== "Admin"? null:
        <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <FuncionariosTable />
        </section>}

      </main>
    </div>
  );
}
