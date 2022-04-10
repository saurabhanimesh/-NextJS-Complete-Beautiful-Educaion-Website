import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/shadows-into-light-two";
import "@fontsource/waiting-for-the-sunrise";
import { useRouter } from "next/router";
import { React, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Head from "next/head";
import LoadingScreen from "../components/loadingScreen";

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 2000);
  }, []);

  return (
    <>
      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Head>
            <link rel="icon" href="images/pht.png" />
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
