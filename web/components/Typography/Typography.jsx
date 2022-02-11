import cn from "classnames";
const styleMapper = { 1: "text-2xl font-bold", 2: "text-xl font-bold" };
export function Heading({ level = 1, children, ...rest }) {
  const Element = `h${level}`;

  return (
    <Element
      {...rest}
      className={cn(styleMapper[level], "text-gray-800 dark:text-white")}
    >
      {children}
    </Element>
  );
}

export function Text({ children, ...rest }) {
  return <p {...rest}>{children}</p>;
}
