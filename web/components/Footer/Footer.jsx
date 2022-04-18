import { useTranslation } from "next-i18next";
import Link from "next/link";

const items = [
  {
    title: "pomodoroTechnique",
    url: "/what-is-pomodoro-technique",
  },
  {
    title: "blog",
    url: "/blog",
  },
  {
    title: "about",
    url: "/about",
  },
  {
    title: "termsOfService",
    url: "/terms",
  },
  {
    title: "privacyPolicy",
    url: "/privacy",
  },
];

export function Footer(props) {
  const { t } = useTranslation("common");
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto py-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-4">
        <p className="text-neutral-500">
          © {new Date()?.getFullYear()}{" "}
          <Link href="/">
            <a className="underline">Pomotrack.io</a>
          </Link>
          . All rights reserved.
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {items.map((item) => (
            <Link href={item?.url} key={item?.url}>
              <a>{t(item.title)}</a>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
