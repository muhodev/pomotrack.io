import { Logo } from "components";

export function Header(props) {
  /* const { t } = useTranslation(); */
  return (
    <header className="px-4 h-16 border-b border-neutral-200 dark:border-neutral-800 w-full flex items-center justify-between sticky top-0 z-[9999] gap-8">
      <div className="container mx-auto">
        <Logo />
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
