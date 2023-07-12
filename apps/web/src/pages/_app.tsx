import Menu from '@/components/Menu/Menu'
import Head from '@/components/nextHead'
import Card from "@/components/card";
import Container from "@/components/container";

import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import type { AppProps } from 'next/app'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { GlobalStyle } from '@/styles/globals';

const fetcher = async (path: string, option: any) => {
  const res = await axios(path, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${getCookie('whenDinner-session')}`
    }
  })

  if (res.data.user.type !== 2)
    throw new Error()

  return { data: res.data, status: res.status }
}

async function getLogin() {
  await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/getLogin`, {
    method: 'GET'
  }).then((res) => {
    window.location.href = res.data.data
    return
  }).catch(err => {
    console.error(err)
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/verify`, fetcher)

  if (error && (!router.asPath.includes('/account/login') && !router.asPath.includes('/account/signUp') && !router.asPath.includes('/callback'))) {
    return (
      <>
        <Head />
        <Menu />
        <Container>
          <Card title="Error!">
            <div>
              사소한 에러가 있었나 보군요!<br />
              아래 해결 방법을 사용해보실래요?
              <br /><br />
              1. <a onClick={getLogin} style={{ cursor: 'pointer' }}>로그인</a><br />
              2. 관리자에게 문의하기. (최태혁)
            </div>
          </Card>
        </Container>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Head />
        <Menu />

      </>
    )
  } else {
    return (
      <>
        <GlobalStyle />
        <Head />
        <Menu />
        <Component {...pageProps} />
      </>
    )
  }
}
