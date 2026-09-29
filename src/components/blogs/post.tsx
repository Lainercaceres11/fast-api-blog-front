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
    <article className="group py-5 first:pt-2" key={blog.id}>
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-bold tracking-[1px]">
        <span className="text-[#c2694e]">{blog.title}</span>
        <span className="h-1 w-1 rounded-full bg-[#d8ae59]" />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-(family-name:--font-display) text-[22px] font-normal leading-snug text-[#203b34] transition group-hover:text-[#a6533d] sm:text-2xl">
            {blog.content}
          </h3>
        </div>
        <button
          className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-[#d9e0d9] text-sm text-[#55705f] transition hover:border-[#9bac9f] hover:bg-[#e9eee7]"
          type="button"
          aria-label={`Abrir ${blog.title}`}
        >
          ↗
        </button>
      </div>
      <button
        onClick={() => handleDeletePost(blog.id)}
        className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-[#d9e0d9] text-sm text-[#55705f] transition hover:border-[#9bac9f] hover:bg-[#e9eee7]"
        aria-label={`Delete post`}
      >
        ❌
      </button>
      <Link
        to={`/edit-post/${userId}/${blog.id}`}
        className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-[#d9e0d9] text-sm text-[#55705f] transition hover:border-[#9bac9f] hover:bg-[#e9eee7]"
        aria-label="Editar post"
      >
        Editar
      </Link>
      {index === 0 && (
        <div className="mt-4 h-px w-10 bg-[#dfa17b]" aria-hidden="true" />
      )}
    </article>
  );
}
