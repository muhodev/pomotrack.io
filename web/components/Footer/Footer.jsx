import { useTranslation } from "next-i18next";
import Link from "next/link";

const items = (language) => [
  {
    title: "pomodoroTechnique",
    url:
      language === "tr"
        ? "/blog/pomodoro-teknigi-nedir-nasil-uygulanir"
        : "/blog/what-is-pomodoro-technique",
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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function Footer(props) {
  const { t, i18n } = useTranslation("common");
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
        <div className="flex flex-col lg:flex-row items-center gap-4 text-neutral-600 dark:text-neutral-400 ">
          {items(i18n.language).map((item) => (
            <Link href={item?.url} key={item?.url}>
              <a className="dark:hover:text-neutral-300 hover:underline">
                {t(item.title)}
              </a>
            </Link>
          ))}
          <Link href="/" locale="en">
            <a
              onClick={(e) => {
                e.preventDefault();
                setCookie("NEXT_LOCALE", "en");
                window.location.replace("/");
              }}
            >
              English
            </a>
          </Link>
          <Link href="/" locale="tr">
            <a
              onClick={(e) => {
                e.preventDefault();
                setCookie("NEXT_LOCALE", "tr");
                window.location.replace("/");
              }}
            >
              Türkçe
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
