import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import airplaneBg from "../assets/airplane-bg.jpg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoading(true);
    setErro("");

    try {
      const res = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: username, senha: password }),
      });

      if (!res.ok) {
        setErro("Usuário ou senha inválidos.");
        return;
      }

      const data = await res.json();
      login(data.token);

      const rotas: Record<string, string> = {
        Admin: "/home",
        Engenheiro: "/home",
        Operador: "/home",
      };
      navigate(rotas[data.nivel] ?? "/");
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${airplaneBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full max-w-sm mx-4 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-white/80 text-sm font-light tracking-[0.3em] uppercase mb-1">
            Login
          </p>
          <h1
            className="text-white text-5xl font-thin tracking-widest drop-shadow-lg"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            AeroCode
          </h1>
          <div className="mt-3 mx-auto w-24 h-px bg-white/40" />
        </div>

        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome do usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-3.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 text-sm font-light tracking-wide outline-none focus:bg-white/25 focus:border-white/60 transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-5 py-3.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 text-sm font-light tracking-wide outline-none focus:bg-white/25 focus:border-white/60 transition-all duration-300"
          />

          {/* Mensagem de erro */}
          {erro && (
            <p className="text-red-300 text-xs text-center tracking-wide">
              {erro}
            </p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-44 py-3 rounded-lg bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-md border border-slate-500/40 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/40 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Acessando...
            </span>
          ) : (
            "Acessar"
          )}
        </button>
      </div>
    </div>
  );
}