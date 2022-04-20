import { Tag } from "components/Tag";
import Link from "next/link";

export function PostPreview(props) {
  console.log(props.tags);
  return (
    <article className="bg-surface-color rounded-lg overflow-hidden">
      <header>
        <Link href={`/blog/${props.slug}`}>
          <a className="block">
            <figure>
              <img className="w-full" src={props.cover} alt={props.coverAlt} />
            </figure>
          </a>
        </Link>
      </header>
      <div className="px-4 py-6">
        <h2 className="font-medium text-lg md:text-xl pb-4">
          <Link href={`/blog/${props.slug}`}>
            <a className="rounded-lg overflow-hidden block hover:underline">
              {props.title}
            </a>
          </Link>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          {props.excerpt}
        </p>
        <div className="pt-4">
          {props.tags?.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <a className="hover:underline text-white font-medium">
                <Tag>{tag}</Tag>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <footer className="px-4 py-4 text-neutral-600 dark:text-neutral-300 text-sm">
        <div>
          <time>{new Date(props.date)?.toLocaleDateString()}</time>
        </div>
      </footer>
    </article>
  );
}
