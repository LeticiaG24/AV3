import { useLocation, useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/admin" || location.pathname === "/engenheiro" || location.pathname === "/operador";

  return (
      <header className="bg-transparent flex items-center justify-center py-5">

        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer absolute left-6 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-blue-100 text-[#1e3a5f] hover:bg-blue-50 transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(30,58,95,0.12)" }}
            aria-label="Voltar"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <div className="aerocode-pill bg-white border border-blue-100 rounded-full px-20 py-3.5 flex items-center gap-3 w-[620px] justify-center">
          <Plane size={20} color="#1e3a5f" />
          <span className="text-[#1e3a5f] text-lg tracking-widest">
            AeroCode
          </span>
        </div>

      </header>
  );
}
