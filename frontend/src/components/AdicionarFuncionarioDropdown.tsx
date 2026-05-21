import { useState, useRef, useEffect } from "react";
import type { Funcionario } from "../types";

interface AdicionarFuncionarioDropdownProps {
  funcionariosJaAdicionados: number[];
  onAdicionar: (funcionario: Funcionario) => void;
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Componente ─────────────────────────────────────────────────────────────────

export function AdicionarFuncionarioDropdown({
  funcionariosJaAdicionados,
  onAdicionar,
}: AdicionarFuncionarioDropdownProps) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Buscar funcionários do backend
  useEffect(() => {
    fetch("http://localhost:3333/funcionarios")
      .then((res) => res.json())
      .then((data) => {
        setFuncionarios(data);
      });
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAberto(false);
        setBusca("");
      }
    }

    if (aberto) {
      document.addEventListener("mousedown", handleClickFora);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickFora);
  }, [aberto]);

  // Filtrar funcionários disponíveis
  const disponiveis = funcionarios.filter(
    (f) =>
      !funcionariosJaAdicionados.includes(f.id) &&
      f.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setAberto((v) => !v);
          setBusca("");
        }}
        className="flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
      >
        <UserPlusIcon className="w-3.5 h-3.5" />
        Adicionar funcionário
      </button>

      {aberto && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">

          {/* Search */}
          <div className="p-3 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <SearchIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

              <input
                autoFocus
                type="text"
                placeholder="Buscar funcionário..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />

              {busca && (
                <button
                  onClick={() => setBusca("")}
                  className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Lista */}
          <div className="max-h-56 overflow-y-auto">
            {disponiveis.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-slate-400">
                  {busca
                    ? "Nenhum funcionário encontrado."
                    : "Todos os funcionários já foram adicionados."}
                </p>
              </div>
            ) : (
              disponiveis.map((f) => {
                const jaAdicionado =
                  funcionariosJaAdicionados.includes(f.id);

                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      onAdicionar(f);
                      setAberto(false);
                      setBusca("");
                    }}
                    disabled={jaAdicionado}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left disabled:opacity-50 border-b border-slate-50 last:border-0 cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {f.nome}
                      </p>

                      <p className="text-xs text-slate-400 mt-0.5">
                        {f.nivelPermissao} · {f.telefone}
                      </p>
                    </div>

                    {jaAdicionado && (
                      <CheckIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-400">
              {disponiveis.length} funcionário
              {disponiveis.length !== 1 ? "s" : ""} disponível
              {disponiveis.length !== 1 ? "is" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}