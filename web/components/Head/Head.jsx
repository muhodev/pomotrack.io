import NextHead from "next/head";
import { SITE_TITLE } from "@constants";

export function Head(props) {
  return (
    <NextHead>
      <title>
        {props.title || ""} | {SITE_TITLE}
      </title>
      <meta name="description" content={props.description || ""} />
    </NextHead>
  );
}
