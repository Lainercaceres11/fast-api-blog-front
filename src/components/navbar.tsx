import { Link } from "react-router";
import type { User } from "../types/user";

type NavbarProps = {
  user: User | null;
  loading: boolean;
};

export default function Navbar({ user, loading }: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#dce3dd] py-5">
      <Link
        className="inline-flex items-center gap-2.25 text-[25px] font-bold text-[#20342f] no-underline"
        to="/"
        aria-label="Margen, inicio"
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

      <p className="hidden text-xs font-semibold uppercase tracking-[0.15em] text-[#67736d] sm:block">
        Un espacio para las ideas
      </p>

      <nav className="flex items-center gap-3 text-[10px] font-semibold sm:gap-4 sm:text-xs">
        <a
          className="hidden text-[#39554a] no-underline md:inline"
          href="#publicaciones"
        >
          Publicaciones{" "}
          <span className="pl-1 text-[#e1795b]" aria-hidden="true">
            ↘
          </span>
        </a>

        {!loading && (
          <>
            {!user ? (
              <>
                <Link className="text-[#39554a] no-underline" to="/login">
                  Iniciar sesión
                </Link>

                <Link
                  className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                  to="/register"
                >
                  Crear cuenta
                </Link>
              </>
            ) : (
              <Link
                className="rounded-sm bg-[#203b34] px-3 py-2 text-[#f5f2e9] no-underline transition hover:bg-[#395e50]"
                to="/home"
              >
                Mis blogs
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
