import '../global.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import PublicLayout from '@/components/Layout/PublicLayout'
import { wrapper } from '@/lib/redux/store'
import NextNProgressClient from '@/components/common/NextNProgressClient'
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'usehooks-ts'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  return getLayout(
    <PublicLayout>
      <NextNProgressClient />
      <Component {...pageProps} />
      <Toaster containerClassName={isDesktop ? "text-sm" : "text-xs"} position="top-center" />
    </PublicLayout>,
  )
}

export default wrapper.withRedux(MyApp)
