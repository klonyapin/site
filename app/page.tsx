import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default function Home() {
  const profile = getProfile();
  const latestPosts = getPosts().slice(0, 3);
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
      {latestPosts.length > 0 ? (
        <ul className="latest-posts">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <time dateTime={post.published}>{post.published}</time>
              <span>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                {post.tags.length > 0 && (
                  <small>{post.tags.map((tag) => `#${tag}`).join(" ")}</small>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事はまだありません。</p>
      )}
      <p><Link href="/blog">すべての記事を見る →</Link></p>
    </SiteShell>
  );
}
