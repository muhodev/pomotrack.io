import { Logo, Avatar } from "components";
import { ProfileMenu } from "./ProfileMenu";

export function Header(props) {
  return (
    <header className="px-4 h-16 border-b w-full bg-main-color border-primary-color flex items-center justify-between fixed top-0 z-[9999]">
      <div>
        <Logo />
      </div>
      <div>
        <ProfileMenu />
      </div>
    </header>
  );
}
