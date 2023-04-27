import Head from "@/components/nextHead";
import GlobalReducers from "@/modules/GlobalReducers";
import { GlobalStyle } from "@/styles/globals";
import { getCookie, removeCookie } from "@/utils/cookies";
import axios from "axios";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [event, update] = useReducer(GlobalReducers, {
    size: {
      width: 0, 
      height: 0
    },
    user: {
      class: 0,
      exp: 0,
      fullname: "",
      gender: "M",
      grade: 0,
      iat: 0,
      login: "",
      nickname: "",
      number: 0,
      roomNumber: "",
      student_id: "",
      type: 0
    },
    tab: false
  })

  function handleResize() {
    update({ type: 'reSizeEvent', width: window.innerWidth, height: window.innerHeight })
  }

  async function tokenCheck() {
    const token = getCookie('GBSW_SESSION')
    if (!router.asPath.includes('/callback')) {
      if (!token) {
        await axios(process.env.NEXT_PUBLIC_BASE_URL + '/api/account/getLogin', {
          method: "GET"
        }).then((res) => {
          return router.push(res.data.data)
        })
        .catch(err => {
          console.error(err)
        })
      } else {
        await axios(process.env.NEXT_PUBLIC_BASE_URL + '/api/account/verify', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie('GBSW_SESSION')}`
          }
        })
        .then((res) => {
          if (!res.data.isReturn) {
            if (router.asPath.includes('/outgo/setectReturn')) {

            }
          }
        })
        .catch((err) => {
          removeCookie('GBSW_SESSION');
          router.reload();
        })
      }
    }
  }

  useEffect(() => {
    handleResize();
    tokenCheck();
    window.addEventListener("resize", handleResize, false);
  }, [])

  return (
    <>
      <GlobalStyle />
      <Head />

      <Component {...pageProps} size={event.size} user={event.user} />
    </>
    )
}
