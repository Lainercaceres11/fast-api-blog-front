import { useEffect, useState } from "react";
import { useUser } from "../context/user-context";

import Post from "./blogs/post";

type Blog = {
  id: number;
  title: string;
  content: string;
};

export default function HomeUser() {
  const { user } = useUser();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error("Error obteniendo los blogs");
      setLoading(false);
      return;
    }

    const blog = await response.json();

    setBlogs(blog.data);
    setLoading(false);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs((blog) => blog.filter((blog) => blog.id != id));
  };

  useEffect(() => {
    if (user) {
      getBlogs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="grid min-h-screen items-center justify-center">
        Loading user...
      </div>
    );
  }

  const initials = user?.fullname
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="min-h-screen bg-[#f3f5f0] font-(family-name:--font-body) text-[#20342f]">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pt-11">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#dce3dd] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[1.5px] text-[#738079]">
              ESPACIO PERSONAL <span className="px-1 text-[#d8ae59]">/</span>{" "}
              AUTOR 0 {user.id}
            </p>
            <h1 className="font-(family-name:--font-display) text-4xl font-normal leading-tight text-[#203b34] sm:text-[42px]">
              Hola,{" "}
              <em className="not-italic text-[#c2694e]">
                {user.fullname.split(" ")[0]}.
              </em>
            </h1>
            <p className="mt-2 text-sm text-[#738079]">
              Aquí tienes tus publicaciones y los detalles de tu cuenta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <section id="blogs" aria-labelledby="blogs-title">
            <div className="mb-5 flex items-end justify-between border-b border-[#dce3dd] pb-4">
              <div>
                <p className="mb-1 text-[9px] font-bold tracking-[1.4px] text-[#c2694e]">
                  TU CUADERNO ABIERTO
                </p>
                <h2
                  id="blogs-title"
                  className="font-(family-name:--font-display) text-[28px] font-normal leading-tight text-[#203b34]"
                >
                  Tus blogs
                </h2>
              </div>
              <span className="pb-1 text-[10px] text-[#87928b]">
                {blogs.length} publicaciones
              </span>
            </div>

            <div className="divide-y divide-[#dce3dd]">
              {loading ? (
                <p>Loading post...</p>
              ) : blogs.length === 0 ? (
                <p>No tienes post</p>
              ) : (
                blogs.map((blog, index) => (
                  <Post
                    userId={user.id}
                    blog={blog}
                    index={index}
                    onGetPost={() => handleDeleteBlog(blog.id)}
                  />
                ))
              )}
            </div>
          </section>

          <aside className="border-t border-[#dce3dd] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="flex items-center gap-4 border-b border-[#dce3dd] pb-5">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[#203b34] font-(family-name:--font-display) text-xl text-[#e7b875]">
                {initials}
              </div>
              <div className="min-w-0">
                <h2 className="font-(family-name:--font-display) text-xl font-normal leading-tight text-[#203b34]">
                  {user.fullname}
                </h2>
                <p className="mt-1 text-xs text-[#738079]">@{user.username}</p>
              </div>
            </div>

            <div className="py-5">
              <p className="mb-4 text-[9px] font-bold tracking-[1.4px] text-[#738079]">
                INFORMACIÓN DE CUENTA
              </p>
              <dl className="space-y-4">
                <div>
                  <dt className="text-[10px] text-[#87928b]">
                    Correo electrónico
                  </dt>
                  <dd className="mt-1 break-all text-xs font-medium text-[#39554a]">
                    {user.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-[#87928b]">
                    Nombre de usuario
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-[#39554a]">
                    @{user.username}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-[#87928b]">ID de usuario</dt>
                  <dd className="mt-1 font-mono text-xs text-[#39554a]">
                    #{user.id.toString().padStart(4, "0")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex items-center gap-2 border-t border-[#dce3dd] pt-4 text-[11px]">
              <span
                className={`size-2 rounded-full ${user.disabled ? "bg-[#c2694e]" : "bg-[#62846a]"}`}
              />
              <span className="text-[#68776e]">
                {user.disabled ? "Cuenta desactivada" : "Cuenta activa"}
              </span>
            </div>
          </aside>
        </div>

        <footer className="mt-12 flex flex-col gap-2 border-t border-[#dce3dd] pt-5 text-[10px] text-[#87928b] sm:flex-row sm:items-center sm:justify-between">
          <span>
            MARGEN<span className="text-[#e1795b]">.</span> IDEAS QUE SE
            COMPARTEN
          </span>
          <span>Escribe, comparte, vuelve a empezar.</span>
        </footer>
      </section>
    </div>
  );
}
