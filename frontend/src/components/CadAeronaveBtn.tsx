import { useState } from "react";
import { CadAeronaveModal } from "../modals/CadAeronaveModal"

export default function CadAeronaveBtn() {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-[#4a7ba7] hover:bg-[#3d6b93] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm">
      <span>Cadastrar<br />Aeronave</span>
      {<CadAeronaveModal isOpen={open} onClose={() => {}} />}
              {open && (
                <CadAeronaveModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                />
              )}
    </button>
  );
}