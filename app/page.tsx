import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default function Home() {
  const profile = getProfile();
  return (
    <SiteShell>
      <header>
        <img className="avatar" src={profile.icon_url} alt={`${profile.name}のプロフィールアイコン`} />
        <h1>{profile.name}</h1>
        <p className="nicknames">aka. {profile.nicknames.join(", ")}</p>
      </header>
      <p>{profile.introduction}</p>
      <h2>連絡先</h2>
      <ul><li>{profile.email}</li>{profile.social_links.map((item) => <li key={item.label}><a href={item.href} target="_blank" rel="noreferrer">{item.label}</a></li>)}</ul>
      <h2>経歴</h2>
      <ul className="career">{profile.career.map((item) => <li key={`${item.date}-${item.detail}`}><time dateTime={item.date}>{item.date}</time> {item.detail}</li>)}</ul>
      <h2>資格・免許</h2>
      <ul>{profile.qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>ブログ</h2>
      <p><Link href="/blog">記事一覧を見る →</Link></p>
    </SiteShell>
  );
}
