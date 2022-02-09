import { Sidebar } from "components";

export function Layout(props) {
  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <main className="flex-1">{props.children}</main>
    </div>
  );
}
