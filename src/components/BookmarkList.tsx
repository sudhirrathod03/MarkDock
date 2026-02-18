"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const getFaviconUrl = (url: string) => {
  try {
    const { origin } = new URL(url);
    return `https://www.google.com/s2/favicons?sz=32&domain=${origin}`;
  } catch {
    return null;
  }
};

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const supabase = createClient();

  const fetchInitialData = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });
    setBookmarks(data || []);
  }, [supabase]);
  useEffect(() => {
    if (!userId) return; 
    const setupRealtime = async () => {
      await supabase.realtime.setAuth(userId);

      const channel = supabase
        .channel(`user-sync-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${userId}`, 
          },
          () => {
            console.log("Change detected - re-fetching...");
            fetchInitialData();
          }
        )
        .subscribe((status) => {
          console.log(`Realtime Status for ${userId}:`, status);
        });

      return channel;
    };

    fetchInitialData();
    const channelPromise = setupRealtime();

    return () => {
      channelPromise.then((ch) => supabase.removeChannel(ch));
      window.removeEventListener("refresh-bookmarks", fetchInitialData);
    };
  }, [userId, fetchInitialData, supabase]);

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (!error) {
      toast("Bookmark removed", {
        icon: "🗑️",
        style: {
          borderRadius: "10px",
          background: "#0f0e0c",
          color: "#f5f2ec",
          fontSize: "0.875rem",
        },
      });
    } else {
      toast.error("Failed to delete");
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-3">
        <div className="w-11 h-11 rounded-xl border-[1.5px] border-dashed border-black/20 flex items-center justify-center text-black/20">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect
              x="2"
              y="2"
              width="6"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="10"
              y="2"
              width="6"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="2"
              y="10"
              width="6"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="10"
              y="10"
              width="6"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <p className="text-sm text-black/30 font-light tracking-wide">
          No bookmarks yet. Add one above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {bookmarks.map((b) => {
        const favicon = getFaviconUrl(b.url);
        return (
          <div
            key={b.id}
            className="group flex items-center gap-3.5 px-4 py-3.5 bg-white border border-black/[0.09] rounded-xl transition-all duration-200 hover:border-[#c4622d]/30 hover:shadow-md hover:shadow-black/5 hover:translate-x-0.5"
          >
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl bg-[#c4622d] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {favicon ? (
                <img
                  src={favicon}
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-black/25"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0f0e0c] truncate">
                {b.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-black/35 truncate">
                  {getDomain(b.url)}
                </span>
                <span className="text-black/15 text-xs">·</span>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c4622d] font-medium flex items-center gap-0.5 hover:opacity-70 transition-opacity flex-shrink-0"
                >
                  Visit
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 8L8 2M8 2H4.5M8 2v3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <button
              onClick={() => deleteBookmark(b.id)}
              aria-label="Delete bookmark"
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-black/25 transition-all hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
