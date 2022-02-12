import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Head, Layout } from "components";
import { SkipNext } from "components/Icons";
import { usePomodoro } from "hooks/usePomodoro";

export default function Home() {
  const { t } = useTranslation("common");

  const {
    timerString,
    pomodoroTypes,
    pomodoroType,
    setPomodoroType,
    setTimerStatus,
    timerStatus,
    pomodoroIntervalCount,
    handleNextPomodoroType,
    setTimer,
  } = usePomodoro();

  return (
    <Layout>
      <Head title={`${timerString}`} description={t("siteDescription")}></Head>
      <div>
        <div className="">
          <div className="rounded-md my-10 py-4 px-6 bg-surface-color container mx-auto max-w-xl border border-primary-color">
            <div className="flex items-center justify-center gap-2">
              {Object.keys(pomodoroTypes).map((p) => (
                <Button
                  key={p}
                  size="small"
                  className={p === pomodoroType ? "bg-main-color" : ""}
                  onClick={() => {
                    setTimerStatus("idle");
                    setPomodoroType(p);
                    setTimer(pomodoroTypes[p]);
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
                className="bg-primary text-main-color rounded-md"
                onClick={() =>
                  setTimerStatus((prev) =>
                    prev === "running" ? "idle" : "running"
                  )
                }
              >
                {t(timerStatus === "running" ? "stop" : "start")}
              </Button>
              {timerStatus === "running" && (
                <Button
                  className="bg-primary text-main-color rounded-md"
                  onClick={handleNextPomodoroType}
                  icon={SkipNext}
                ></Button>
              )}
            </div>
          </div>
          <div className="relative flex items-center justify-center ">
            <div className="divider absolute"></div>
            <div className="text  gap-1 px-4 bg-main-color z-10">
              <span className="text-subdued">{t("today")}:</span>
              <span>#{pomodoroIntervalCount} pomodoro</span>
            </div>
          </div>

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
