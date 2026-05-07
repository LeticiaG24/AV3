import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/admin" || location.pathname === "/engenheiro" || location.pathname === "/operador";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600&display=swap');
        .aerocode-pill {
          font-family: 'Cinzel', serif;
          box-shadow:
            0 8px 32px rgba(30, 58, 95, 0.18),
            0 2px 8px rgba(30, 58, 95, 0.10);
        }
      `}</style>
      <header className="bg-transparent flex items-center justify-center py-5">

        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer absolute left-6 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-blue-100 text-[#1e3a5f] hover:bg-blue-50 transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(30,58,95,0.12)" }}
            aria-label="Voltar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div className="aerocode-pill bg-white border border-blue-100 rounded-full px-20 py-3.5 flex items-center gap-3 w-[620px] justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1e3a5f"
          >
            <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5z"/>
          </svg>
          <span className="text-[#1e3a5f] text-lg tracking-widest">
            AeroCode
          </span>
        </div>

      </header>
    </>
  );
}
