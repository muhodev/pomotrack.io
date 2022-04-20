import fs from "fs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import matter from "gray-matter";

import { Head, Layout, PostPreview } from "components";

export default function BlogPost(props) {
  const { t } = useTranslation("common");
  const posts = Array.isArray(props.posts) ? props.posts : [];
  return (
    <Layout>
      <Head title={"Blog"} description={t("siteDescription")}></Head>
      <div className="container mx-auto my-6">
        <div>
          <h1 className="text-3xl font-bold mb-5">Blog</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            {posts?.map((post) => (
              <PostPreview {...post} key={post.slug} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {
  const dirName = `data/posts/${locale}`;
  const files = fs.readdirSync(dirName);

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`${dirName}/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      ...frontmatter,
    };
  });
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
