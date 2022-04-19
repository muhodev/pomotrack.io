import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Head, Layout } from "components";

export default function About(props) {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Head title={"About"} description={t("siteDescription")}></Head>
      <div className="container mx-auto my-6">
        <div className="p-content">
          <h1>About</h1>
          <h2>Welcome to Pomotrack.io</h2>
          <p>
            * Firstly, we're on{" "}
            <span className="font-medium px-2 border text-yellow-500 border-yellow-500 dark:border-yellow-300 dark:text-yellow-300 text-sm rounded-md">
              Beta
            </span>
          </p>
          <p>
            * Founded in 2022 by{" "}
            <a href="https://twitter.com/muhodev">@muhodev</a>
          </p>
          <p>
            * We're dedicated to providing you the very best of life tracking
            with pomodoro technique.
          </p>

          <p>
            * We hope you enjoy our products as much as we enjoy offering them
            to you. If you have any questions or comments, please don't hesitate
            to contact us.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
