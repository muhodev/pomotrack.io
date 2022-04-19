import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import { GOOGLE_ANALYTICS_KEY } from "@constants";
import { ThemeProvider } from "next-themes";

import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
        ></Script>
        <Script strategy="lazyOnload">
          {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GOOGLE_ANALYTICS_KEY}');`}
        </Script>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
