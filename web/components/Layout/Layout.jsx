import { Sidebar, Header } from "components";

export function Layout(props) {
  return (
    <div className="text-main-color bg-main-color min-h-screen">
      <Header />
      <div className="flex items-start">
        {/*  <Sidebar /> */}
        <main className="flex-1">{props.children}</main>
      </div>
    </div>
  );
}
