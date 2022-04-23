import fs from "fs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import matter from "gray-matter";

import { Head, Layout, PostPreview, Tag } from "components";
import { BLOG_TAGS } from "@constants";
import Link from "next/link";

export default function TagList(props) {
  const { t } = useTranslation("common");
  const posts = Array.isArray(props.posts) ? props.posts : [];
  return (
    <Layout>
      <Head title={"Blog"} description={t("siteDescription")}></Head>
      <div className="container mx-auto my-6">
        <div>
          <h1 className="text-3xl font-bold mb-5">
            <Link href="/blog">
              <a className="hover:underline">Blog</a>
            </Link>
          </h1>
          <h3 className="pt-3 pb-5 font-medium flex items-center space-x-2">
            <span className="text-lg">{t("tag")}:</span>
            <Tag>{props?.tag}</Tag>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
            {posts?.map((post) => (
              <PostPreview {...post} key={post.slug} />
            ))}
          </div>
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
    paths: BLOG_TAGS.map((tag) => ({
      params: {
        slug: tag.slug,
      },
      locale: tag.locale,
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params: { slug }, locale }) => {
  const dirName = `data/posts/${locale}`;
  const files = fs.readdirSync(dirName);

  const posts = files
    .map((fileName) => {
      const slug = fileName.replace(".md", "");
      const readFile = fs.readFileSync(`${dirName}/${fileName}`, "utf-8");
      const { data: frontmatter } = matter(readFile);

      return {
        slug,
        ...frontmatter,
      };
    })
    .filter((post) => post.tags.includes(slug));
  return {
    props: {
      tag: slug,
      posts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
