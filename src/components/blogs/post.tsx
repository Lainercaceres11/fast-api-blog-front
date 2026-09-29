import { Link } from "react-router";
import type { Blog } from "../../types/user";

export default function Post({
  blog,
  index,
  userId,
  onGetPost,
}: {
  blog: Blog;
  index: number;
  userId: number;
  onGetPost: (id: number) => void;
}) {
  const handleDeletePost = async (id: number) => {
    onGetPost(id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${blog.id}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <article
      className="group flex flex-col gap-4 py-5 first:pt-2 sm:flex-row sm:items-center sm:justify-between"
      key={blog.id}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-bold tracking-[1px]">
          <span className="text-[#c2694e]">{blog.title}</span>
          <span className="h-1 w-1 rounded-full bg-[#d8ae59]" />
        </div>
        <h3 className="font-(family-name:--font-display) text-[22px] font-normal leading-snug text-[#203b34] transition group-hover:text-[#a6533d] sm:text-2xl">
          {blog.content}
        </h3>
      </div>
      <div
        className="flex shrink-0 items-center gap-2"
        aria-label="Acciones del post"
      >
        <Link
          to={`/edit-post/${userId}/${blog.id}`}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-sm border border-[#cbd7ce] px-3 text-[11px] font-semibold text-[#39554a] transition hover:border-[#557565] hover:bg-[#e8eee8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557565]"
          aria-label={`Editar ${blog.title}`}
        >
          Editar
        </Link>
        <button
          onClick={() => handleDeletePost(blog.id)}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-sm border border-[#ead2c9] px-3 text-[11px] font-semibold text-[#a6533d] transition hover:border-[#c2694e] hover:bg-[#fbefeb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2694e]"
          type="button"
          aria-label={`Eliminar ${blog.title}`}
        >
          Eliminar
        </button>
      </div>
      {index === 0 && (
        <div className="mt-4 h-px w-10 bg-[#dfa17b]" aria-hidden="true" />
      )}
    </article>
  );
}
