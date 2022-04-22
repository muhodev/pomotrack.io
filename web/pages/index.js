import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Head, Layout } from "components";
import { SkipNext } from "components/Icons";
import { usePomodoro } from "hooks/usePomodoro";
import { HOME_TITLE } from "@constants";

export default function Home() {
  const [startedPomodoro, setStartedPomodoro] = useState(false);
  const { t } = useTranslation("common");

  const {
    timerString,
    pomodoroTypes,
    pomodoroType,
    setPomodoroType,
    setTimerStatus,
    timerStatus,
    handleNextPomodoroType,
    setTimer,
  } = usePomodoro();

  useEffect(() => {}, [timerString]);
  return (
    <Layout>
      <Head
        title={startedPomodoro ? timerString : HOME_TITLE}
        description={t("siteDescription")}
      ></Head>

      <div className="invisible opacity-0 pointer-events-none">
        {/* The button For Safari audio problem */}
        <button
          id="ring-audio-button"
          onClick={() => {
            document
              .getElementById("ring-audio")
              .play()
              .catch(() => {
                alert("Error playing audio");
              });
          }}
        >
          Button
        </button>
        <audio id="ring-audio">
          <source src="/audios/egg-timer-ding.mp3" type="audio/mpeg"></source>
        </audio>
      </div>
      <div>
        <div>
          <div
            style={{ minHeight: "calc(100vh - 8rem)" }}
            className="flex items-start justify-center"
          >
            <div className="rounded-md my-12 py-4 px-6 bg-surface-color container mx-auto max-w-xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-400">
                {Object.keys(pomodoroTypes).map((p) => (
                  <Button
                    key={p}
                    size="small"
                    className={
                      p === pomodoroType
                        ? "dark:bg-neutral-900 bg-neutral-200 text-neutral-900 dark:text-neutral-300"
                        : ""
                    }
                    onClick={() => {
                      setTimerStatus("idle");
                      setPomodoroType(p);
                      setTimer(pomodoroTypes[p]);
                      setStartedPomodoro(true);
                    }}
                  >
                    {t(p)}
                  </Button>
                ))}
              </div>
              <div className="text-5xl md:text-9xl font-bold text-center py-12">
                {timerString}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  fullWidth
                  className="bg-primary text-white rounded-md"
                  onClick={() => {
                    setTimerStatus((prev) =>
                      prev === "running" ? "idle" : "running"
                    );
                    setStartedPomodoro(true);
                  }}
                >
                  {t(timerStatus === "running" ? "stop" : "start")}
                </Button>
                {timerStatus === "running" && (
                  <Button
                    className="bg-primary text-white rounded-md"
                    onClick={handleNextPomodoroType}
                    icon={SkipNext}
                  ></Button>
                )}
              </div>
            </div>
          </div>

          {/*   <div className="relative flex items-center justify-center ">
            <div className="divider absolute"></div>
            <div className="text  gap-1 px-4 bg-main-color z-10">
              <span className="text-neutral-600 dark:text-neutral-300">
                {t("today")}:
              </span>
              <span>#{pomodoroIntervalCount} pomodoro</span>
            </div>
          </div>
          <div className="text-center my-4">
            {t("projects")} {t("soon")}
          </div>
 */}
          {/* 
          Youtube video to audio stream
          https://www.labnol.org/internet/youtube-audio-player/26740/
          <div>
            <div
              data-video="K-y_pzks1t4"
              data-autoplay="0"
              data-loop="1"
              id="youtube-audio"
            ></div>
            <Script
              strategy="lazyOnload"
              src="https://www.youtube.com/iframe_api"
            ></Script>
            <Script
              strategy="lazyOnload"
              src="https://cdn.rawgit.com/labnol/files/master/yt.js"
            ></Script>
          </div> */}
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
