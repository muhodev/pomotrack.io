export function Heading({ level = 1, children, ...rest }) {
  const Element = `h${level}`;

  return <Element {...rest}>{children}</Element>;
}

export function Text({ children, ...rest }) {
  return <p {...rest}>{children}</p>;
}
