"use client";
import { createClient } from "@/utils/supabase/client";

const links = [
  {
    label: "Design System Docs",
    url: "figma.com/...",
    tag: "Design",
    tagBg: "rgba(100,180,255,0.2)",
    tagColor: "rgba(180,225,255,0.85)",
    dotColor: "#64b4ff",
    delay: "animate-[slideInLeft_0.6s_ease_0.1s_backwards]",
    cardBg: "bg-white/5",
    border: "",
  },
  {
    label: "Sprint Board",
    url: "linear.app/...",
    tag: "Work",
    tagBg: "rgba(245,242,236,0.1)",
    tagColor: "rgba(245,242,236,0.65)",
    dotColor: "#f5f2ec",
    delay: "animate-[slideInLeft_0.6s_ease_0.2s_backwards]",
    cardBg: "bg-white/[0.08]",
    border: "border border-white/10",
  },
  {
    label: "Research Papers",
    url: "arxiv.org/...",
    tag: "Learning",
    tagBg: "rgba(120,220,150,0.2)",
    tagColor: "rgba(160,240,185,0.85)",
    dotColor: "#78dc96",
    delay: "animate-[slideInLeft_0.6s_ease_0.3s_backwards]",
    cardBg: "bg-white/5",
    border: "",
  },
  {
    label: "Client Proposal v3",
    url: "notion.so/...",
    tag: "Urgent",
    tagBg: "rgba(196,98,45,0.3)",
    tagColor: "rgba(255,180,140,0.9)",
    dotColor: "#c4622d",
    delay: "animate-[slideInLeft_0.6s_ease_0.4s_backwards]",
    cardBg: "bg-[rgba(196,98,45,0.15)]",
    border: "border border-[rgba(196,98,45,0.25)]",
  },
];

export default function LoginPage() {
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Error logging in:", error.message);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f5f2ec]">
      <div className="hidden md:flex relative flex-col justify-between overflow-hidden bg-[#0f0e0c] p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(196,98,45,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_20%,rgba(200,185,154,0.12),transparent_50%)]" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,242,236,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] border border-white/30 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="1"
                y="1"
                width="6"
                height="6"
                rx="1.5"
                fill="rgba(245,242,236,0.8)"
              />
              <rect
                x="9"
                y="1"
                width="6"
                height="6"
                rx="1.5"
                fill="rgba(245,242,236,0.4)"
              />
              <rect
                x="1"
                y="9"
                width="6"
                height="6"
                rx="1.5"
                fill="rgba(245,242,236,0.4)"
              />
              <rect
                x="9"
                y="9"
                width="6"
                height="6"
                rx="1.5"
                fill="rgba(196,98,45,0.9)"
              />
            </svg>
          </div>
          <span className="font-serif text-[1.15rem] font-medium tracking-wide text-white/90">
            MarkDock
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-2.5 my-auto">
          {links.map((link, i) => (
            <div
              key={i}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl ${link.cardBg} ${link.border} ${link.delay}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: link.dotColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[0.8rem] font-medium text-white/80 tracking-[0.01em] truncate">
                  {link.label}
                </p>
                <p className="text-[0.7rem] text-white/35 mt-0.5 font-mono truncate">
                  {link.url}
                </p>
              </div>
              <span
                className="text-[0.62rem] font-medium tracking-[0.03em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: link.tagBg, color: link.tagColor }}
              >
                {link.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-5">
          <p className="font-serif text-[0.95rem] italic text-white/50 leading-relaxed">
            "Finally, one place for everything that matters — not a dozen
            browser tabs."
          </p>
          <p className="mt-2.5 text-[0.72rem] text-white/25 tracking-[0.05em] uppercase">
            — Product Designer, Berlin
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center px-8 py-16 md:p-12">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_60%_50%,rgba(196,98,45,0.06),transparent_70%)]" />

        <div className="relative w-full max-w-[400px] animate-[fadeUp_0.7s_ease_0.2s_backwards]">
          <p className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-[#c4622d] mb-4">
            Welcome back
          </p>
          <h1 className="font-serif text-[2.4rem] font-medium leading-[1.15] tracking-tight text-[#0f0e0c] mb-3">
            Your dock
            <br />
            awaits.
          </h1>

          <p className="text-[0.92rem] font-light text-black/50 leading-relaxed mb-10">
            Sign in to access all your important links, neatly organized and
            always within reach.
          </p>


          <div className="flex flex-wrap gap-2 mb-10">
            {["Organized", "Always synced", "Fast access"].map((label) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/[0.06] border border-black/[0.1] rounded-full text-[0.74rem] text-black/55"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4622d] flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-black/[0.1]" />
            <span className="text-[0.72rem] text-black/30 tracking-[0.06em] uppercase whitespace-nowrap">
              Continue with
            </span>
            <div className="flex-1 h-px bg-black/[0.1]" />
          </div>


          <button
            onClick={handleLogin}
            className="group relative w-full flex items-center justify-center gap-3 px-6 py-[15px] bg-[#0f0e0c] text-[#f5f2ec] rounded-[10px] text-[0.92rem] font-medium tracking-wide overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(15,14,12,0.2)] active:translate-y-0 active:shadow-[0_3px_10px_rgba(15,14,12,0.15)]"
          >

            <span className="absolute inset-0 bg-gradient-to-br from-[rgba(196,98,45,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <svg
              className="w-[18px] h-[18px] flex-shrink-0 relative z-10"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            <span className="relative z-10">Sign in with Google</span>
          </button>


          <p className="mt-7 text-center text-[0.75rem] text-black/35 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#c4622d] font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#c4622d] font-medium hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
