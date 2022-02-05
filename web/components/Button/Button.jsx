import cn from "classnames";
import { Icon } from "components";
import style from "./style.module.css";

export function Button({
  children,
  onClick,
  className,
  icon: IconSource,
  size = "default",
  fullWidth = false,
}) {
  return (
    <button
      className={cn(
        style.button,
        style[`size-${size}`] || style[`size-default`],
        { "w-full": fullWidth },
        className
      )}
      onClick={typeof onClick === "function" ? onClick : undefined}
    >
      {IconSource && <Icon source={IconSource} />}
      {children}
    </button>
  );
}
