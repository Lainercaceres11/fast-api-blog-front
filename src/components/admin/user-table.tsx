import { useState } from "react";
import UpdateUser from "./update-user";
import CreateUser from "./create-user";
import type { NewUser } from "./create-user";
import type { User } from "../../types/user";

type UserTableProps = {
  users: User[];
  onUpdateUser?: (user: User) => Promise<void>;
  onDeleteUser?: (userId: number) => void;
  onCreateUser: (user: NewUser) => Promise<void>;
};

export default function UserTable({
  users,
  onUpdateUser,
  onDeleteUser,
  onCreateUser,
}: UserTableProps) {
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="users-table-title"
        className="overflow-hidden rounded-sm border border-[#dce3dd] bg-[#fbfcf9] shadow-[0_8px_30px_#10221d0a]"
      >
        <div className="flex flex-col gap-3 border-b border-[#e7ebe5] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="mb-1 text-[9px] font-bold tracking-[1.4px] text-[#c2694e]">
              ADMINISTRACIÓN
            </p>
            <h2
              id="users-table-title"
              className="font-(family-name:--font-display) text-2xl font-normal text-[#203b34]"
            >
              Usuarios
            </h2>
          </div>
          <p className="text-xs text-[#738079]">
            {users.length} {users.length === 1 ? "usuario" : "usuarios"}
          </p>

          <button
            type="button"
            onClick={() => setIsCreateUserOpen(true)}
            className="rounded-sm bg-[#203b34] px-4 py-2 text-xs font-semibold text-[#f5f2e9] transition hover:bg-[#395e50]"
          >
            Crear Usuario
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 border-collapse text-left">
            <thead>
              <tr className="bg-[#f3f5f0] text-[9px] font-bold tracking-[1.1px] text-[#738079]">
                <th scope="col" className="px-5 py-3.5 sm:px-6">
                  ID
                </th>
                <th scope="col" className="px-4 py-3.5">
                  USUARIO
                </th>
                <th scope="col" className="px-4 py-3.5">
                  NOMBRE COMPLETO
                </th>
                <th scope="col" className="px-4 py-3.5">
                  CORREO ELECTRÓNICO
                </th>
                <th scope="col" className="px-4 py-3.5">
                  ROL
                </th>
                <th scope="col" className="px-5 py-3.5 sm:px-6">
                  ESTADO
                </th>
                <th scope="col" className="px-5 py-3.5 sm:px-6">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7ebe5]">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-[#87928b]"
                  >
                    No hay usuarios para mostrar.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="text-xs text-[#39554a] transition-colors hover:bg-[#f7f8f4]"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-[#87928b] sm:px-6">
                      #{user.id.toString().padStart(4, "0")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#20342f]">
                      @{user.username}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {user.fullname}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#738079]">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          user.role === "admin"
                            ? "bg-[#f5ead7] text-[#93682e]"
                            : "bg-[#e8eee8] text-[#567361]"
                        }`}
                      >
                        {user.role === "admin" ? "Administrador" : "Usuario"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`size-1.5 rounded-full ${
                            user.disabled ? "bg-[#c2694e]" : "bg-[#62846a]"
                          }`}
                        />
                        <span
                          className={
                            user.disabled ? "text-[#a6533d]" : "text-[#567361]"
                          }
                        >
                          {user.disabled ? "Desactivado" : "Activo"}
                        </span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={!onUpdateUser}
                          onClick={() => setUserToUpdate(user)}
                          aria-label={`Actualizar usuario ${user.username}`}
                          className="rounded-sm border border-[#c9d4cc] px-3 py-1.5 text-[10px] font-semibold text-[#39554a] transition hover:border-[#567361] hover:bg-[#e8eee8] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Actualizar
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteUser && onDeleteUser(user.id)}
                          aria-label={`Eliminar usuario ${user.username}`}
                          className="rounded-sm border border-[#e5c9c1] px-3 py-1.5 text-[10px] font-semibold text-[#a6533d] transition hover:border-[#c2694e] hover:bg-[#f8ece8]"
                        >
                          Desactivar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {userToUpdate && onUpdateUser && (
        <UpdateUser
          isOpen
          user={userToUpdate}
          onClose={() => setUserToUpdate(null)}
          onUpdateUser={onUpdateUser}
        />
      )}
      <CreateUser
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onCreateUser={onCreateUser}
      />
    </>
  );
}
