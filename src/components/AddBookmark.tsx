"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function AddBookmark({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setLoading(true);

    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title: title.trim(), url: url.trim(), user_id: userId }])
      .select();

    if (!error) {
      toast.success("Bookmark saved!", {
        icon: "🚀",
        style: {
          borderRadius: "10px",
          background: "#0f0e0c",
          color: "#f5f2ec",
          fontSize: "0.875rem",
        },
      });
      setTitle("");
      setUrl("");
      window.dispatchEvent(new Event("refresh-bookmarks"));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-[#f5f2ec] border border-black/10 rounded-2xl p-7 shadow-sm overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#c4622d] via-[#e8956a] to-[#c4622d]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-black/40">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. GitHub"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 bg-white border border-black/[0.13] rounded-xl text-sm text-[#0f0e0c] placeholder:text-black/25 outline-none transition focus:border-[#c4622d] focus:ring-2 focus:ring-[#c4622d]/10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-black/40">
            URL
          </label>
          <input
            type="url"
            placeholder="https://github.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 bg-white border border-black/[0.13] rounded-xl text-sm text-[#0f0e0c] placeholder:text-black/25 outline-none transition focus:border-[#c4622d] focus:ring-2 focus:ring-[#c4622d]/10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0f0e0c] text-[#f5f2ec] text-sm font-medium tracking-wide rounded-xl cursor-pointer transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-black/15 active:scale-[0.985] disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
      >
        {loading ? (
          <>
            <svg
              className="w-3.5 h-3.5 animate-spin"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
              <path
                d="M7 1.5A5.5 5.5 0 0112.5 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Saving…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v9M4 7l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 13h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Save Bookmark
          </>
        )}
      </button>
    </form>
  );
}
