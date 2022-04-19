import NextHead from "next/head";
import { SITE_TITLE } from "@constants";

export function Head(props) {
  return (
    <NextHead>
      <title>
        {props.title || ""} | {SITE_TITLE}
      </title>
      <link rel="alternate" hreflang="en" href="https://pomotrack.io/en" />
      <link rel="alternate" hreflang="tr" href="https://pomotrack.io/tr" />
      <link rel="alternate" hreflang="x-default" href="https://pomotrack.io" />
      <meta name="description" content={props.description || ""} />
    </NextHead>
  );
}
