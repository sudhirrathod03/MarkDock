import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#0f0e0c]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(196,98,45,0.07),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,185,154,0.1),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 pb-20">
        <header className="flex items-center justify-between py-7 border-b border-black/[0.09] mb-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-black/[0.1] rounded-[9px] bg-white shadow-sm flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="rgba(15,14,12,0.7)"
                />
                <rect
                  x="9"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="rgba(15,14,12,0.22)"
                />
                <rect
                  x="1"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="rgba(15,14,12,0.22)"
                />
                <rect
                  x="9"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="#c4622d"
                />
              </svg>
            </div>
            <span className="text-[1.1rem] font-semibold tracking-tight text-[#0f0e0c]">
              MarkDock
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/[0.09] rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-xs text-black/40 max-w-[180px] truncate">
              {user!.email}
            </span>
          </div>
        </header>

        <section>
          <div className="flex items-center gap-3 mb-3.5">
            <span className="text-[0.62rem] font-medium tracking-[0.12em] uppercase text-black/35">
              New bookmark
            </span>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>
          <AddBookmark userId={user.id} />
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-[1.35rem] font-semibold tracking-tight text-[#0f0e0c]">
              Saved Links
            </h2>
          </div>
          <BookmarkList userId={user.id} />
        </section>
      </div>
    </main>
  );
}
