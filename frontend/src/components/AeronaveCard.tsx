import { useNavigate } from "react-router-dom";


export default function AeronaveCard() {
  const navigate = useNavigate();
  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate("/aeronave") }
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-base leading-tight">
          Modelo
        </h3>
      </div>

      <div className="space-y-1.5">
        {[
          { label: "Código", value: "XXX-1234" },
          { label: "Tipo", value: "Comercial" },
          { label: "Capacidade", value: "180 passageiros" },
          { label: "Alcance", value: "5.000 km" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-400 font-medium w-20 flex-shrink-0">
              {label}:
            </span>
            <span className="text-sm text-slate-700">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}