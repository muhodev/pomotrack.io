import NextHead from "next/head";
import Script from "next/script";

export function Head(props) {
  return (
    <NextHead>
      <title>{props.title || ""}</title>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6BG3M8G3SV"
      ></Script>
      <Script>
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6BG3M8G3SV');`}
      </Script>
    </NextHead>
  );
}
