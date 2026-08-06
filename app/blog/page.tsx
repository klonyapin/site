import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getPosts();
  return (
    <SiteShell>
      <h1>Blog</h1>
      <div className="post-list">{posts.map((post) => (
        <article className="post-row" key={post.slug}>
          <img src={post.thumbnail} alt="" />
          <div><time dateTime={post.published}>{post.published}</time><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><div className="tags">{post.tags.map((tag) => <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>)}</div></div>
        </article>
      ))}</div>
    </SiteShell>
  );
}
