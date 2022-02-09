import NextLink from "next/link";
import cn from "classnames";

export function Link({ href, children, className, style, ...rest }) {
  return (
    <NextLink href={href} {...rest}>
      <a className={cn(className)} style={style}>
        {children}
      </a>
    </NextLink>
  );
}
