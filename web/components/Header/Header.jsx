import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Logo } from "components";
import { Sun, Moon } from "components/Icons";

export function Header(props) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <Sun
          className="text-2xl text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <Moon
          className="text-2xl text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  return (
    <header className="px-4 h-16 border-b border-neutral-200 dark:border-neutral-800 w-full flex items-center justify-between sticky top-0 z-[9999] gap-8">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div>{renderThemeChanger()}</div>
      </div>
      {/*    <div className="flex items-center gap-6">
        <div>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Button size="small" variant="primary">
          {t("createtask")}
        </Button>
        <ProfileMenu />
      </div> */}
    </header>
  );
}
