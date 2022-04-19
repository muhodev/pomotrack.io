import cn from "classnames";
import { Icon } from "components";
import buttonStyle from "./style.module.css";

export function Button({
  children,
  onClick,
  className,
  variant = "default",
  icon: IconSource,
  size = "default",
  fullWidth = false,
  style,
}) {
  return (
    <button
      className={cn(
        buttonStyle.button,
        buttonStyle[`variant-${variant}`] || buttonStyle["variant-default"],
        buttonStyle[`size-${size}`] || buttonStyle[`size-default`],
        { "w-full": fullWidth },
        className
      )}
      style={style}
      onClick={typeof onClick === "function" ? onClick : undefined}
    >
      {IconSource && <Icon source={IconSource} size="small" />}
      {children}
    </button>
  );
}
