import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/profile";

export function SiteShell({ children }: { children: ReactNode }) {
  const profile = getProfile();
  const theme = {
    "--background": profile.theme.background_color,
    "--text": profile.theme.text_color,
    "--accent": profile.theme.accent_color,
  } as CSSProperties;
  return (
    <main style={theme}>
      <article className="document">
        <nav className="site-nav"><Link href="/">profile</Link> / <Link href="/blog">blog</Link></nav>
        {children}
      </article>
    </main>
  );
}
