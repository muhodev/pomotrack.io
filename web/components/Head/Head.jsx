import { SITE_TITLE } from "@constants";
import NextHead from "next/head";

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
