import { useState } from "react";
import { Link } from "react-router";
import type { User } from "../types/user";

type NavbarProps = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

export default function Navbar({ user, loading, logout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
      <header className="flex items-center justify-between border-b border-[#dce3dd] py-4 sm:py-5">
        <Link
          viewTransition
          className="inline-flex items-center gap-2.25 text-[25px] font-bold text-[#20342f] no-underline"
          to="/"
          aria-label="Margen, inicio"
          onClick={closeMenu}
        >
          <span className="flex h-5 items-end gap-0.5" aria-hidden="true">
            <i className="h-3.5 w-1.25 rounded-t-sm bg-[#e1795b]" />
            <i className="h-4.75 w-1.25 rounded-t-sm bg-[#395e50]" />
            <i className="h-2.75 w-1.25 rounded-t-sm bg-[#d8ae59]" />
          </span>
          <span>
            margen<span className="text-[#e1795b]">.</span>
          </span>
        </Link>

        <p className="hidden text-xs font-semibold uppercase tracking-[0.15em] text-[#67736d] lg:block">
          Un espacio para las ideas
        </p>

        {!loading && (
          <>
            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-2 text-xs font-semibold md:flex lg:gap-3"
            >
              {!user ? (
                <>
                  <Link
                    viewTransition
                    className="px-2 py-2 text-[#39554a] no-underline"
                    to="/login"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    viewTransition
                    className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                    to="/register"
                  >
                    Crear cuenta
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    viewTransition
                    className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                    to="/home"
                  >
                    Mis blogs
                  </Link>
                  <Link
                    viewTransition
                    className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                    to="/create-post"
                  >
                    Crear post
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      viewTransition
                      className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                      to="/admin/users"
                    >
                      Admin users
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-sm bg-red-800 px-3 py-2 text-[#f5f2e9] transition hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>

            <button
              type="button"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-10 place-items-center rounded-sm border border-[#dce3dd] text-[#203b34] transition hover:bg-[#e8eee8] md:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5"
              >
                {isMenuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </>
        )}
      </header>

      {!loading && isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="grid gap-1 border-b border-[#dce3dd] bg-[#fbfcf9] py-3 md:hidden"
        >
          {!user ? (
            <>
              <Link
                viewTransition
                onClick={closeMenu}
                className="rounded-sm px-3 py-3 text-sm font-semibold text-[#39554a] no-underline transition hover:bg-[#e8eee8]"
                to="/login"
              >
                Iniciar sesión
              </Link>
              <Link
                viewTransition
                onClick={closeMenu}
                className="rounded-sm px-3 py-3 text-sm font-semibold text-[#39554a] no-underline transition hover:bg-[#e8eee8]"
                to="/register"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                viewTransition
                onClick={closeMenu}
                className="rounded-sm px-3 py-3 text-sm font-semibold text-[#39554a] no-underline transition hover:bg-[#e8eee8]"
                to="/home"
              >
                Mis blogs
              </Link>
              <Link
                viewTransition
                onClick={closeMenu}
                className="rounded-sm px-3 py-3 text-sm font-semibold text-[#39554a] no-underline transition hover:bg-[#e8eee8]"
                to="/create-post"
              >
                Crear post
              </Link>
              {user.role === "admin" && (
                <Link
                  viewTransition
                  onClick={closeMenu}
                  className="rounded-sm px-3 py-3 text-sm font-semibold text-[#39554a] no-underline transition hover:bg-[#e8eee8]"
                  to="/admin/users"
                >
                  Administrar usuarios
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="rounded-sm px-3 py-3 text-left text-sm font-semibold text-[#a6533d] transition hover:bg-[#f8ece8]"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      )}
    </div>
  );
}
