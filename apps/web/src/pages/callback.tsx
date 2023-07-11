import Card from "@/components/card";
import Container from "@/components/container";
import { setCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/router"
import useSWR from 'swr'

const callbackFetcher = async (path: string) => {
  await axios(path, {
    method: 'GET'
  })
  .then((res) => {
    setCookie('whenDinner-session', res.data.token, { path: '/' })
    window.location.href = '/auth/user'
  })
  .catch((err) => {
    console.error(err)
  })
}

export default function Callback() {
  const router = useRouter();
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/callback?id_token=${router.query.id_token}&state=${router.query.state}`, callbackFetcher)

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
