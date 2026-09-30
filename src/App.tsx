import { useState, useEffect } from "react";

type Posts = {
  id: string;
  title: string;
  content: string;
  author_id: string;
};

function App() {
  const [books, setBooks] = useState<Posts[] | []>([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
    const booksJson = await response.json();
    setBooks(booksJson.data);
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f5f0] font-(family-name:--font-body) text-[#20342f]">
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <main id="inicio">
          <section className="relative isolate mt-7 min-h-86.25 overflow-hidden rounded-lg bg-[#203b34] px-6 py-10 text-[#f5f2e9] sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff12_0.7px,transparent_0.7px)] bg-size-[8px_8px] opacity-35"
            />
            <div className="relative z-10 max-w-2xl">
              <p className="flex items-center gap-2.25 text-[10px] font-bold tracking-[1.5px] text-[#b3c3b9]">
                <span className="h-1.75 w-1.75 rounded-full bg-[#e5a47c]" />{" "}
                NOTAS, IDEAS Y PUNTOS DE VISTA
              </p>
              <h1 className="mt-5 max-w-150 font-(family-name:--font-display) text-[38px] font-normal leading-[1.08] text-[#f5f2e9] sm:text-[50px] lg:text-[58px]">
                Ideas para
                <br />
                <em className="font-normal text-[#e7b875]">quedarse</em>{" "}
                pensando.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#c5d3cb] sm:text-base">
                Un cuaderno abierto para historias, hallazgos y pensamientos que
                vale la pena compartir.
              </p>
              <a
                className="mt-7 inline-flex items-center gap-3 rounded-[3px] border border-[#758c7e] px-3.75 py-2.75 text-xs font-semibold text-[#f5f2e9] no-underline transition hover:border-[#e7b875] hover:bg-white/5"
                href="#publicaciones"
              >
                Leer publicaciones{" "}
                <span className="pl-1.25 text-[#e1795b]" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
            <div
              className="absolute right-[7%] top-5 h-75 w-72.5 max-[700px]:-bottom-25.25 max-[700px]:-right-9.5 max-[700px]:top-auto max-[700px]:scale-[0.62] max-[700px]:opacity-60 max-[420px]:-right-18.75 max-[420px]:opacity-40"
              aria-hidden="true"
            >
              <div className="absolute right-5.5 top-14.75 h-54 w-43.5 rotate-9 border border-[#d8c89c80] bg-[repeating-linear-gradient(0deg,transparent_0_28px,#d8c89c18_29px_30px)]" />
              <div className="absolute right-21 top-13.25 flex h-55 w-43.75 -rotate-7 flex-col items-start bg-[#f2e9d4] p-4.75 text-[#39554a] shadow-[5px_12px_25px_#10221d55]">
                <span className="text-[7px] font-bold tracking-[1px]">
                  APUNTES AL MARGEN
                </span>
                <strong className="mt-2.5 font-(family-name:--font-display) text-[76px] font-normal leading-[0.9] text-[#cf785c]">
                  “
                </strong>
                <i className="mt-2.5 h-px w-full bg-[#39554a35]" />
                <i className="mt-2.5 h-px w-[82%] bg-[#39554a35]" />
                <i className="mt-2.5 h-px w-[61%] bg-[#39554a35]" />
                <small className="mt-auto text-[6px] font-bold tracking-[0.8px]">
                  IDEAS EN MOVIMIENTO
                </small>
              </div>
              <div className="absolute bottom-1.5 right-0 text-[8px] tracking-[1.3px] text-[#b3c3b9]">
                N.º 01
              </div>
            </div>
            <div
              className="pointer-events-none absolute -bottom-11.25 right-4.5 font-(family-name:--font-display) text-[240px] leading-none text-white/3 max-[700px]:-bottom-8 max-[700px]:-right-1.75 max-[700px]:text-[170px]"
              aria-hidden="true"
            >
              01
            </div>
          </section>

          <section id="publicaciones" className="pt-12 sm:pt-16">
            <div className="flex items-end justify-between border-b border-[#dce3dd] pb-6">
              <div>
                <p className="flex items-center gap-2.25 text-[10px] font-bold tracking-[1.5px] text-[#738079]">
                  EL CUADERNO ABIERTO
                </p>
                <h2 className="mt-2 font-(family-name:--font-display) text-[30px] font-normal leading-[1.1] text-[#20342f] sm:text-[34px]">
                  Publicaciones
                </h2>
              </div>
              <span className="hidden text-[9px] font-bold tracking-[1.4px] text-[#87928b] sm:block">
                LECTURAS PARA HACER UNA PAUSA
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
              {!loading ? (
                books.map((book) => {
                  return (
                    <article
                      className="min-w-0 rounded border border-[#dce3dd] bg-[#fbfcf9] px-6 py-5.75 pb-4.75 transition hover:-translate-y-0.5 hover:border-[#9bac9f]"
                      key={book.id}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.75 text-[9px] font-bold tracking-[1.2px] text-[#c2694e]">
                          <i className="h-1.5 w-1.5 rounded-full bg-[#d17a5b]" />{" "}
                          PUBLICACIÓN
                        </span>
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[9px] tracking-[0.7px] text-[#87928b]">
                          AUTOR ID / {book.author_id}
                        </span>
                      </div>
                      <h3 className="mt-5.25 wrap-anywhere font-(family-name:--font-display) text-[25px] font-normal leading-[1.2] text-[#203b34]">
                        {book.title}
                      </h3>
                      <div className="mt-4.25 h-0.5 w-8 bg-[#dfa17b]" />
                      <p className="mt-3.5 line-clamp-3 min-h-[5.4em] text-[13px] leading-[1.8] text-[#63736a]">
                        {book.content}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-[#e7ebe5] pt-3.25 text-[8px] font-bold tracking-[1px] text-[#96a098]">
                        <span>MARGEN / APUNTES</span>
                        <span
                          className="text-[15px] text-[#567361]"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="text-center">Cargando post...</p>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-16 flex flex-col gap-2 border-t border-[#dce3dd] pt-5 text-xs text-[#78847d] sm:flex-row sm:items-center sm:justify-between">
          <span>
            MARGEN<span className="text-[#e1795b]">.</span> &nbsp;IDEAS QUE SE
            COMPARTEN
          </span>
          <span>Hecho para leer sin prisa.</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
