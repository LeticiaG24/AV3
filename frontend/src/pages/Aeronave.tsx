import Header from "../components/Header";
import Testes from "../components/Testes";
import EtapasTable from "../components/EtapasTable";
import PecasTable from "../components/PecasTable";


interface Aeronave {
  modelo: string;
  codigo: string;
  tipo: string;
  capacidade: string;
  alcance: string;
}

const aeronave: Aeronave = {
  modelo: "Boeing 737-800",
  codigo: "BR-001",
  tipo: "Comercial",
  capacidade: "162 pas",
  alcance: "5.765 km",
};


// ── Main Page ──────────────────────────────────────────────────────────────────

export default function Aeronave() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-6 space-y-6">

        {/* Top section: Modelo | Testes | Relatório */}
        <div className="grid grid-cols-3 gap-4">

          {/* Modelo */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4">
            <h2 className="text-base font-semibold text-slate-800 underline underline-offset-2 mb-3">
              {aeronave.modelo}
            </h2>
            <div className="space-y-1.5">
              {[
                { label: "Código", value: aeronave.codigo },
                { label: "Tipo", value: aeronave.tipo },
                { label: "Capacidade", value: aeronave.capacidade },
                { label: "Alcance", value: aeronave.alcance },
              ].map(({ label, value }) => (
                <div key={label} className="text-sm">
                  <span className="text-slate-500">{label}: </span>
                  <span className="text-slate-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Testes />

          {/* Relatório */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-2">Relatório</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gerar um relatório completo da aeronave para análise e controle.
              </p>
            </div>
            <button
              className="mt-4 w-full bg-[#4a7ba7] hover:bg-[#3d6b93] active:bg-[#2f5578] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Gerar relatório (.txt)
            </button>
          </div>
        </div>

        {/* Peças */}
        <PecasTable />

        {/* Etapas */}
        <EtapasTable />
      </main>
    </div>
  );
}