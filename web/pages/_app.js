import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-6BG3M8G3SV"
      ></Script>
      <Script strategy="lazyOnload">
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6BG3M8G3SV');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
