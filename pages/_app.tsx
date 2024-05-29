import "../global.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import PublicLayout from "@/components/Layout/PublicLayout";
import { wrapper } from "@/lib/redux/store";

import NextNProgressClient from "@/components/common/NextNProgressClient";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <PublicLayout>
      <NextNProgressClient />
      <Component {...pageProps} />
    </PublicLayout>
  );
};

export default wrapper.withRedux(MyApp);
