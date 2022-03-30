import cn from "classnames";
import { Label } from "components";
import style from "./style.module.css";

export function TextField({
  value,
  onChange,
  placeholder,
  className,
  style: propsStyle,
  variant = "default",
  size = "default",
  label,
  ...rest
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={propsStyle}
        className={cn(
          style.textField,
          style[`variant-${variant}`] || style["variant-default"],
          style[`size-${size}`] || style[`size-default`],
          "bg-main-color border border-primary-color",
          className
        )}
        {...rest}
      />
    </div>
  );
}
