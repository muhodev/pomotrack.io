import { Logo, Icon } from "components";
import {
  CalendarToday,
  Folder,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  Assessment,
  TaskAlt,
} from "components/Icons";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import cn from "classnames";
import style from "./style.module.css";

export function Sidebar(props) {
  const { t } = useTranslation("common");
  const items = [
    {
      icon: <Icon source={CalendarToday} size="small" />,
      label: t("today"),
      url: "/",
    },
    {
      icon: <Icon source={Assessment} size="small" />,
      label: t("reports"),
      url: "/reports",
    },
    {
      icon: <Icon source={Folder} size="small" />,
      label: t("projects"),
      children: [
        {
          icon: <div className="bg-red-500 w-2 h-2 rounded-full"></div>,
          content: t("common"),
        },
      ],
    },
    {
      icon: <Icon source={TaskAlt} size="small" />,
      label: t("tasks"),
      children: [
        {
          icon: <div className="bg-red-500 w-2 h-2 rounded-full"></div>,
          content: t("common"),
        },
      ],
    },
  ];
  return (
    <aside
      className={cn(
        style.sidebar,
        "bg-main-color border-r border-primary-color sticky left-0 top-0 pt-16 z-[999]"
      )}
    >
      <Menu>
        {items.map((item, index) =>
          Array.isArray(item.children) ? (
            <Menu.SubMenu
              key={index}
              icon={item.icon}
              content={item.label}
              items={item.children}
            />
          ) : (
            <Menu.Item key={index} icon={item.icon} content={item.label} />
          )
        )}
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
        "flex items-center gap-2 py-2 px-4 cursor-pointer select-none",
        className
      )}
    >
      <div className="min-w-[24px] flex items-center justify-center text-gray-7 00">
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
        <ul>
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
