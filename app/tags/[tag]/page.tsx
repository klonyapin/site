import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getPosts().filter((post) => post.tags.includes(tag));
  return <SiteShell><h1>#{tag}</h1><ul>{posts.map((post) => <li key={post.slug}><time dateTime={post.published}>{post.published}</time> <Link href={`/blog/${post.slug}`}>{post.title}</Link></li>)}</ul></SiteShell>;
}
