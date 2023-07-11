import Card from "@/components/card";
import Container from "@/components/container";
import { setCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  async function callBack() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/callback?id_token=${router.query.id_token}&state=${router.query.state}`, {
      method: 'GET'
    }).then((res) => {
      setCookie('whenDinner-session', res.data.token, { path: '/' })
      window.location.href = '/auth/user'
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    callBack()
  }, [router.isReady])

  return (
    <Container>
      <Card title="Loading...">
        <div>
          잠시만 기다려주세요!
        </div>
      </Card>
    </Container>
  )
}
