import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Blog } from "../../types/user";

type FormField = {
  title: string;
  content: string;
};

export default function EditPost() {
  const { user_id, blog_id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormField>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const getPost = async () => {
      const userId = Number(user_id);
      const blogId = Number(blog_id);
      const token = localStorage.getItem("access_token");

      if (!user_id || !blog_id || !Number.isFinite(userId) || !Number.isFinite(blogId)) {
        setError("La ruta no contiene un usuario o post válido.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Debes iniciar sesión para editar este post.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message ?? "No se pudo cargar el post.");
        }

        const post = (result.data as Blog[]).find((item) => item.id === blogId);
        if (!post) {
          throw new Error("No se encontró el post para este usuario.");
        }

        if (!cancelled) {
          setForm({ title: post.title, content: post.content });
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Ocurrió un error al cargar el post.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void getPost();
    return () => {
      cancelled = true;
    };
  }, [user_id, blog_id]);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token || !blog_id) {
      setError("No se pudo identificar el post o la sesión.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${blog_id}`,
        {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "No se pudo actualizar el post.");
      }

      navigate("/home");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Ocurrió un error al actualizar el post.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-[#f3f5f0] bg-[radial-gradient(#39554a0c_0.7px,transparent_0.7px)] bg-size-[9px_9px] px-[5%] font-(family-name:--font-body) text-[#20342f]">
      <div className="mx-auto grid w-full max-w-280 grid-cols-1 items-center gap-8 py-6.5 sm:py-9 md:min-h-[calc(100vh-73px)] md:grid-cols-[minmax(0,1fr)_minmax(310px,0.8fr)] md:gap-10 md:py-14 lg:gap-24">
        <section
          className="relative isolate flex min-h-72.5 flex-col justify-center overflow-hidden bg-[#203b34] px-6.75 py-8.25 text-[#f5f2e9] sm:min-h-85 md:min-h-120 md:px-7.5 md:py-9.5 lg:px-13.5 lg:py-14.5"
          aria-labelledby="login-title"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff12_0.7px,transparent_0.7px)] bg-size-[8px_8px] opacity-40"
          />
          <div className="relative z-10 max-w-122.5">
            <p className="flex items-center gap-2.25 text-[10px] font-bold tracking-[1.5px] text-[#b3c3b9]">
              <span className="h-1.75 w-1.75 rounded-full bg-[#e5a47c]" /> QUÉ
              BUENO TENERTE DE VUELTA
            </p>
            <h1
              id="login-title"
              className="mt-6.5 font-(family-name:--font-display) text-[33px] font-normal leading-[1.12] text-[#f5f2e9] sm:text-[37px] lg:text-[51px]"
            >
              Tus ideas
              <br />
              siguen <em className="font-normal text-[#e7b875]">aquí.</em>
            </h1>
            <p className="mt-5 max-w-82.5 text-xs leading-[1.8] text-[#c5d3cb] sm:text-[13px]">
              Vuelve a tu espacio y continúa compartiendo lo que merece ser
              leído.
            </p>
          </div>
          <div
            className="absolute -bottom-3 right-[11%] flex h-42.5 w-38.5 origin-bottom-right scale-[0.66] rotate-[-7deg] flex-col items-start bg-[#f2e9d4] p-3.75 text-[#39554a] opacity-50 shadow-[5px_12px_25px_#10221d55] sm:bottom-10 sm:right-[18%] sm:scale-[0.82] md:bottom-10.5 lg:bottom-11.75 lg:right-[10%] lg:scale-100"
            aria-hidden="true"
          >
            <div className="absolute -right-3.25 top-2 -z-10 h-full w-full rotate-13 border border-[#d8c89c80]" />
            <span className="text-[6px] font-bold tracking-[0.8px]">
              APUNTES AL MARGEN
            </span>
            <strong className="mt-1.25 font-(family-name:--font-display) text-[67px] font-normal leading-[0.95] text-[#cf785c]">
              “
            </strong>
            <i className="mt-2 h-px w-full bg-[#39554a35]" />
            <i className="mt-2 h-px w-4/5 bg-[#39554a35]" />
            <i className="mt-2 h-px w-[58%] bg-[#39554a35]" />
            <small className="mt-auto text-[6px] font-bold tracking-[0.8px]">
              IDEAS EN MOVIMIENTO
            </small>
          </div>
          <span
            className="absolute bottom-2.5 right-3 text-[8px] font-bold tracking-[1.2px] text-[#b3c3b9] md:bottom-4.25 md:right-5"
            aria-hidden="true"
          >
            MARGEN / N.º 01
          </span>
        </section>

        <section
          className="mx-auto w-full max-w-102.5 px-1 md:justify-self-center"
          aria-labelledby="form-title"
        >
          <div className="mb-7">
            <p className="text-[10px] font-bold tracking-[1.5px] text-[#738079]">
              TU ESPACIO TE ESPERA
            </p>
            <h2
              id="form-title"
              className="mb-1.75 mt-2 font-(family-name:--font-display) text-[35px] font-normal leading-[1.15] text-[#20342f]"
            >
              Edita tu post
            </h2>
            <p className="m-0 text-xs text-[#78847d]">
              Escribe lo que quieras y piensas.
            </p>
          </div>

          {loading ? (
            <p role="status">Cargando post...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4.25">
            <label className="grid gap-1.75 text-[11px] font-bold text-[#39554a]">
              <span>Titulo</span>
              <input
                defaultValue={form.title}
                value={form.title}
                onChange={handleChangeForm}
                className="min-h-11.5 w-full rounded-xs border border-[#d5ded6] bg-[#fbfcf9] px-3.25 text-xs font-normal text-[#20342f] outline-none transition focus:border-[#557565] focus:ring-[3px] focus:ring-[#557565]/10"
                name="title"
                placeholder="Titulo..."
                type="text"
              />
            </label>
            <label className="grid gap-1.75 text-[11px] font-bold text-[#39554a]">
              <span>Contenido</span>
              <input
                defaultValue={form.content}
                value={form.content}
                onChange={handleChangeForm}
                className="min-h-11.5 w-full rounded-xs border border-[#d5ded6] bg-[#fbfcf9] px-3.25 text-xs font-normal text-[#20342f] outline-none transition focus:border-[#557565] focus:ring-[3px] focus:ring-[#557565]/10"
                name="content"
                placeholder="Contenido del post"
                type="text"
              />
            </label>
            <button
              disabled={Boolean(error)}
              className="mt-1 flex min-h-12 items-center justify-between rounded-xs border border-[#203b34] bg-[#203b34] px-4 text-xs font-semibold text-[#f5f2e9] transition hover:border-[#395e50] hover:bg-[#395e50]"
              type="submit"
            >
              Editar post
              <span className="text-[17px] text-[#e7b875]" aria-hidden="true">
                ↗
              </span>
            </button>
            </form>
          )}
          {error && (
            <p className="mt-3 text-xs text-[#a6533d]" role="alert">
              {error}
            </p>
          )}
          <p className="mt-3.75 text-center text-[10px] leading-[1.6] text-[#87928b]">
            Tus ideas te esperan justo donde las dejaste.
          </p>
        </section>
      </div>
    </div>
  );
}
