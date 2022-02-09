import { Logo, Icon } from "components";
import { Folder, KeyboardArrowDown, KeyboardArrowLeft } from "components/Icons";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import cn from "classnames";
import style from "./style.module.css";

export function Sidebar(props) {
  const { t } = useTranslation("common");
  return (
    <aside className={style.sidebar}>
      <Logo />
      <Menu>
        <Menu.SubMenu
          icon={<Icon source={Folder} size="small" />}
          content={t("projects")}
          items={[
            {
              icon: <div className="bg-red-500 w-2 h-2 rounded-full"></div>,
              content: t("common"),
            },
          ]}
        />
      </Menu>
    </aside>
  );
}

export function Menu(props) {
  return <nav>{props.children}</nav>;
}

Menu.Item = function ({ content, icon, className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-4 px-2 cursor-pointer select-none",
        className
      )}
    >
      <div className="min-w-[24px] flex items-center justify-center">
        {icon}
      </div>
      {content}
    </div>
  );
};

Menu.SubMenu = function (props) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen((o) => !o)} className="flex items-center">
        <Menu.Item
          icon={props.icon}
          content={props.content}
          className="flex-1"
        ></Menu.Item>
        <Icon source={isOpen ? KeyboardArrowDown : KeyboardArrowLeft} />
      </div>
      {isOpen && (
        <ul className="border-t">
          {Array.isArray(props.items) &&
            props.items.map((item, index) => (
              <Menu.Item
                key={index}
                content={item.content}
                icon={item.icon}
              ></Menu.Item>
            ))}
        </ul>
      )}
    </div>
  );
};
