import Menu from '@/components/Menu/Menu'
import Head from '@/components/nextHead'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Menu />
      <Component {...pageProps} />  
    </>
  )
}
