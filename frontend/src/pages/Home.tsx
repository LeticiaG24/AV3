import AeronaveCard from "../components/AeronaveCard";
import Header from "../components/Header";
import FuncionariosTable from "../components/FuncionariosTable";
import CadAeronaveBtn from "../components/CadAeronaveBtn";
import { useEffect, useState } from "react";
import type { Aeronave, Funcionario } from "../types/index";

type Usuario = {
  nome: string;
  nivel: string;
}

export default function Home(usuario: Usuario) {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  async function fetchData() {
    const [aeronavesResponse, funcionariosResponse] =
      await Promise.all([
        fetch("http://localhost:3333/aeronaves"),
        fetch("http://localhost:3333/funcionarios"),
      ]);

    const aeronavesData = await aeronavesResponse.json();
    const funcionariosData = await funcionariosResponse.json();

    setAeronaves(aeronavesData);
    setFuncionarios(funcionariosData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-5">
        <section className="flex items-center justify-between mb-10">
          <div>
            <p className="text-lg font-semibold text-slate-800">{usuario.nome}</p>
            <p className="text-sm text-slate-500 mt-0.5">{usuario.nivel}</p>
          </div>
        </section>

        <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Aeronaves</h2>

            {usuario.nivel === "Operador" ? null : (
              <CadAeronaveBtn atualizarAeronaves={fetchData} />
            )}
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

        {usuario.nivel !== "Admin" ? null : (
          <section className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
            <FuncionariosTable
              funcionarios={funcionarios}
              atualizarFuncionarios={fetchData}
            />
          </section>
        )}
      </main>
    </div>
  );
}