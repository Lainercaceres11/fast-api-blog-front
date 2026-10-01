import { useEffect, useRef, useState } from "react";

export type UpdateProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    email: string;
    fullname: string;
    username: string;
  };
  onUpdateProfile: (userInfo: UpdateProfileProps["userInfo"]) => void;
  isUpdating: boolean;
};

export default function UpdateProfile({
  isOpen,
  onClose,
  userInfo,
  onUpdateProfile,
  isUpdating,
}: UpdateProfileProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState(userInfo);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setFormData(userInfo);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen, userInfo.email, userInfo.fullname, userInfo.username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateProfile(formData);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="update-profile-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md border border-[#dce3dd] bg-[#fbfcf9] p-0 text-[#20342f] shadow-[0_18px_60px_#10221d40] backdrop:bg-[#10221d]/60 backdrop:backdrop-blur-[2px]"
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold tracking-[1.4px] text-[#c2694e]">
              INFORMACIÓN DE CUENTA
            </p>
            <h2
              id="update-profile-title"
              className="mt-2 font-(family-name:--font-display) text-[28px] font-normal leading-tight text-[#203b34]"
            >
              Editar perfil
            </h2>
            <p className="mt-2 text-xs leading-5 text-[#738079]">
              Modifica tus datos de acceso.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            className="grid size-8 shrink-0 place-items-center rounded-sm text-lg text-[#738079] transition hover:bg-[#e8eee8] hover:text-[#203b34]"
          >
            X
          </button>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Nombre de usuario</span>
            <input
              onChange={handleChange}
              value={formData.username}
              autoComplete="username"
              name="username"
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Correo electrónico</span>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              autoComplete="email"
              name="email"
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Nombre completo</span>
            <input
              onChange={handleChange}
              value={formData.fullname}
              autoComplete="name"
              name="fullname"
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-[#e7ebe5] pt-4">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-sm px-3 py-2 text-xs font-semibold text-[#68776e] transition hover:bg-[#e8eee8]"
          >
            Cancelar
          </button>
          <button
            disabled={isUpdating}
            type="submit"
            className="rounded-sm bg-[#203b34] px-4 py-2 text-xs font-semibold text-[#f5f2e9] transition hover:bg-[#395e50]"
          >
            {isUpdating ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
