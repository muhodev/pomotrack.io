import NextHead from "next/head";
import Script from "next/script";

export function Head(props) {
  return (
    <NextHead>
      <title>{props.title || ""}</title>
    </NextHead>
  );
}
