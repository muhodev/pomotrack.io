import { useState } from "react";
import { useTranslation } from "next-i18next";

import { Logo, Button } from "components";
import { ProfileMenu, SearchInput } from "./index";

export function Header(props) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  return (
    <header className="px-4 h-16 border-b w-full border-primary-color flex items-center justify-between sticky top-0 z-[9999] gap-8">
      <div className="flex items-center gap-6">
        <Logo />
      </div>
      <div className="flex items-center gap-6">
        {/* <div>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div> */}
        <Button size="small" variant="primary">
          {t("createtask")}
        </Button>
        <ProfileMenu />
      </div>
    </header>
  );
}
