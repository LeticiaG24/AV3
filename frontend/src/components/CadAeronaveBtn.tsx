import { useState } from "react";
import { CadAeronaveModal } from "../modals/CadAeronaveModal";
import { Plus } from "lucide-react";

interface CadAeronaveBtnProps {
  atualizarAeronaves: () => Promise<void>;
}

export default function CadAeronaveBtn({
  atualizarAeronaves,
}: CadAeronaveBtnProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-white hover:bg-[#3d6b93] hover:text-white text-[#315078] text-sm font-medium px-5 py-2 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer border border-slate-300"
      >
        <Plus />
        <span>Cadastrar Aeronave</span>
      </button>

      {open && (
        <CadAeronaveModal
          isOpen={open}
          onClose={() => setOpen(false)}
          atualizarAeronaves={atualizarAeronaves}
        />
      )}
    </>
  );
}