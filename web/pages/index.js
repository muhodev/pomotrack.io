import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Head } from "components";
import { SkipNextIcon } from "components/Icons";

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
      <div className="bg-primary min-h-screen text-gray-50">
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
                className="bg-white text-primary rounded-md"
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
                  className="bg-white text-primary "
                  onClick={handleNextPomodoroType}
                  icon={SkipNextIcon}
                ></Button>
              )}
            </div>
          </div>
          <div>#{pomodoroIntervalCount} pomodoro</div>
          <div>Projects</div>
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
