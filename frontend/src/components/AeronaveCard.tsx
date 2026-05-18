import { useNavigate } from "react-router-dom";

type Aeronave = {
  id: number;
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
};

type Props = {
  aeronave: Aeronave;
};

export default function AeronaveCard({ aeronave }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-[#D3DBE2] border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/aeronave/${aeronave.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-base leading-tight">
          {aeronave.modelo}
        </h3>
      </div>

      <div className="space-y-1.5">
        {[
          { label: "Código", value: aeronave.codigo },
          { label: "Tipo", value: aeronave.tipo },
          {
            label: "Capacidade",
            value: `${aeronave.capacidade} passageiros`,
          },
          {
            label: "Alcance",
            value: `${aeronave.alcance} km`,
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-600 font-medium w-20 flex-shrink-0">
              {label}:
            </span>

            <span className="text-sm text-slate-900">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}