import { Sidebar, Header } from "components";

export function Layout(props) {
  return (
    <div className="text-main-color">
      <Header />
      <div className="w-full flex items-start">
        <Sidebar />
        <main className="flex-1 bg-main-color pt-16 min-h-screen">
          {props.children}
        </main>
      </div>
    </div>
  );
}
