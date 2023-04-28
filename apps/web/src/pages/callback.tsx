import MenuComponents from "@/components/MenuComponents";
import { getCookie, setCookie } from "@/utils/cookies";
import { GlobalProps } from "@/utils/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function CallBack({ size, update }: GlobalProps) {
  const router = useRouter();

  async function callBackFetch() {
    await axios(process.env.NEXT_PUBLIC_BASE_URL + `/api/account/callback?id_token=${router.query.id_token}&state=${router.query.state}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('GBSW_SESSION')}`
      }
    }).then((res) => {
      setCookie('GBSW_SESSION', res.data.token, { path: '/' })
      router.push('/')
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!router.isReady) return
    callBackFetch();
  }, [router.isReady])

  return (
    <div>
      <MenuComponents size={size} update={update} />
    </div>
  )

}