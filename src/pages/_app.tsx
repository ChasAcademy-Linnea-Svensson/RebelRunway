import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/components/navbar/Navbar";
import Footer from "~/components/footer/Footer";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import "~/styles/globals.css";
import ThemeProvider from "~/components/themes/ThemeProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Head>
          <title>Rebel-Runway</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-start">
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
