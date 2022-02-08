import { Sidebar } from "components";

export function Layout(props) {
  return (
    <>
      <Sidebar />
      {props.children}
    </>
  );
}
