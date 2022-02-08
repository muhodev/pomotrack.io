export function Sidebar(props) {
  return (
    <aside>
      <Menu>
        <Menu.Item icon="" content="Home" url="/" />
      </Menu>
    </aside>
  );
}

export function Menu(props) {
  return <nav>{props.children}</nav>;
}

Menu.Item = function ({ content }) {
  return <li>{content}</li>;
};

Menu.SubMenu = function (props) {
  return (
    <ul>
      <li></li>
    </ul>
  );
};
