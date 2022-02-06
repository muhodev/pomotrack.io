import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Head } from "components";
import { SkipNextIcon } from "components/Icons";
import Script from "next/script";

const pomodoroTypes = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
};
export default function Home() {
  const { t } = useTranslation("common");
  const [pomodoroType, setPomodoroType] = useState("pomodoro");
  const [timerStatus, setTimerStatus] = useState("idle");
  const [timer, setTimer] = useState(pomodoroTypes["pomodoro"]);
  const [pomodoroIntervalCount, setPomodoroIntervalCount] = useState(1);
  const [longBreakIntervalCount, setLongBreakIntervalCount] = useState(4);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const nextPomodoroType = () => {
    if (pomodoroType === "pomodoro") {
      return pomodoroIntervalCount % longBreakIntervalCount === 0
        ? "longBreak"
        : "shortBreak";
    }
    return "pomodoro";
  };

  const handleNextPomodoroType = () => {
    const newPomodorotype = nextPomodoroType();

    newPomodorotype === "pomodoro" &&
      setPomodoroIntervalCount((prev) => prev + 1);

    setTimerStatus("idle");
    setTimer(pomodoroTypes[newPomodorotype]);
    setPomodoroType(newPomodorotype);
  };

  useEffect(() => {
    let interval;
    const clearTimerInterval = () => clearInterval(interval);

    if (timerStatus === "running" && timer > 0) {
      interval = setInterval(() => {
        let newTimer;
        setTimer((t) => {
          newTimer = t - 1;
          return newTimer;
        });
        if (newTimer === 0) {
          handleNextPomodoroType();
        }
      }, 1000);
    }
    return clearTimerInterval;
  }, [timerStatus]);

  const timerString = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  return (
    <>
      <Head title={`${timerString}`} description={t("siteDescription")}></Head>
      <div className="bg-primary min-h-screen text-oposite">
        <header>
          <div className="container mx-auto py-6 max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h1>
              <Link href="/">
                <a className="font-bold text-xl underline">Pomotrack.io</a>
              </Link>
            </h1>
          </div>
        </header>
        <div className="container mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div className="bg-white bg-opacity-10 rounded-md py-4 px-6">
            <div className="flex items-center justify-center gap-2">
              {Object.keys(pomodoroTypes).map((p) => (
                <Button
                  key={p}
                  size="small"
                  className={p === pomodoroType ? "bg-black bg-opacity-20" : ""}
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
                className="bg-oposite text-primary rounded-md"
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
                  className="bg-oposite text-primary "
                  onClick={handleNextPomodoroType}
                  icon={SkipNextIcon}
                ></Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center relative after:absolute after:h-[.5px] after:bg-oposite after:left-0 after:right-0 my-4 text-sm">
            <div className="text inline-flex gap-1 px-4 bg-primary z-10">
              <span className="text-subdued">{t("today")}:</span>
              <span>#{pomodoroIntervalCount} pomodoro</span>
            </div>
          </div>
          <div>Projects</div>
          <div className="my-2 border border-dotted py-4 px-6">{t("soon")}</div>
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
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
