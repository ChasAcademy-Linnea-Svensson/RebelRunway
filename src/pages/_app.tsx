import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/Components/navbar/Navbar";
import Footer from "~/Components/Footer/Footer";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Bästa gruppen</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-start">
        <Component {...pageProps} />
      </div>
      <Footer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
