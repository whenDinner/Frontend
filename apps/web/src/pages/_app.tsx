import Head from "@/components/nextHead";
import GlobalReducers from "@/modules/GlobalReducers";
import { GlobalStyle } from "@/styles/globals";
import { AppProps } from "next/app";
import { useEffect, useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [event, update] = useReducer(GlobalReducers, {
    size: {
      width: 0, 
      height: 0
    }
  })

  function handleResize() {
    update({ type: 'reSizeEvent', width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
  }, [])

  return (
    <>
      <GlobalStyle />
      <Head />

      <Component {...pageProps} size={event.size} />
    </>
  )
}
