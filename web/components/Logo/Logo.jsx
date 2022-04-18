import Link from "next/link";

export function Logo(props) {
  return (
    <h1>
      <Link href="/">
        <a className="text-lg md:text-xl font-medium">pomotrack.io</a>
      </Link>
    </h1>
  );
}
