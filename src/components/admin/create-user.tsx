import { useEffect, useState } from "react";
import DialogWrapper from "../dialog-wrapper";
import type { User } from "../../types/user";

export type NewUser = Pick<
  User,
  "username" | "fullname" | "email" | "role"
> & {
  password: string;
};

type CreateUserProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (user: NewUser) => Promise<void>;
};

const initialFormData: NewUser = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  role: "user",
};

export default function CreateUser({
  isOpen,
  onClose,
  onCreateUser,
}: CreateUserProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      await onCreateUser(formData);
      onClose();
    } catch {
      setError("No se pudo crear el usuario. Inténtalo de nuevo.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      onClose={onClose}
      titleId="create-user-title"
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold tracking-[1.4px] text-[#c2694e]">
              ADMINISTRACIÓN
            </p>
            <h2
              id="create-user-title"
              className="mt-2 font-(family-name:--font-display) text-[28px] font-normal leading-tight text-[#203b34]"
            >
              Crear usuario
            </h2>
            <p className="mt-2 text-xs leading-5 text-[#738079]">
              Completa los datos para registrar una cuenta nueva.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
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
              required
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Nombre completo</span>
            <input
              required
              name="fullname"
              autoComplete="name"
              value={formData.fullname}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  fullname: event.target.value,
                }))
              }
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Correo electrónico</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Contraseña</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            />
          </label>

          <label className="grid gap-1.5 text-[11px] font-semibold text-[#39554a]">
            <span>Rol</span>
            <select
              name="role"
              value={formData.role}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  role: event.target.value === "admin" ? "admin" : "user",
                }))
              }
              className="w-full rounded-sm border border-[#c9d4cc] bg-white px-3 py-2.5 text-sm font-normal text-[#20342f] outline-none transition focus:border-[#567361] focus:ring-2 focus:ring-[#567361]/15"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-xs text-[#a6533d]">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2 border-t border-[#e7ebe5] pt-4">
          <button
            type="button"
            disabled={isCreating}
            onClick={onClose}
            className="rounded-sm px-3 py-2 text-xs font-semibold text-[#68776e] transition hover:bg-[#e8eee8] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isCreating}
            className="rounded-sm bg-[#203b34] px-4 py-2 text-xs font-semibold text-[#f5f2e9] transition hover:bg-[#395e50] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creando..." : "Crear usuario"}
          </button>
        </div>
      </form>
    </DialogWrapper>
  );
}