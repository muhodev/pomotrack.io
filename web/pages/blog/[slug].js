import fs from "fs";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import matter from "gray-matter";
import md from "markdown-it";

import { Head, Layout, Tag } from "components";

export default function BlogPost(props) {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Head title={"Blog"} description={t("siteDescription")}></Head>
      <div className="container mx-auto my-6">
        <div className="">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">{props?.post?.title}</h1>
            <p className="pb-4 text-neutral-600 dark:text-neutral-300">
              {props?.post?.excerpt}
            </p>
            <div className="pt-4">
              {props?.post?.tags?.map((tag) => (
                <Link href={`/blog/tag/${tag}`} key={tag}>
                  <a className="hover:underline text-white font-medium">
                    <Tag>{tag}</Tag>
                  </a>
                </Link>
              ))}
            </div>
            <div className="py-4 text-neutral-600 dark:text-neutral-300 text-sm">
              <time>{new Date(props?.post?.date)?.toLocaleDateString()}</time>
            </div>
          </div>
          <figure className="flex justify-center mx-auto max-w-screen-sm py-4">
            <img
              className="w-full rounded-lg object-cover"
              src={props?.post?.cover}
              alt={props?.post?.coverAlt}
            />
          </figure>
        </div>
        <div className="p-content mt-8">
          {props?.post?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: md().render(props?.post?.content),
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const locales = ["tr", "en"];

  let paths = [];

  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    const dirName = `data/posts/${locale}`;
    const files = fs.readdirSync(dirName);
    const newPaths = files.map((fileName) => ({
      params: {
        slug: fileName.replace(".md", ""),
      },
      locale,
    }));
    paths = paths.concat(newPaths);
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug }, locale }) {
  const fileName = fs.readFileSync(`data/posts/${locale}/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  console.log({ content, frontmatter });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      post: { ...frontmatter, content },
    },
  };
}
