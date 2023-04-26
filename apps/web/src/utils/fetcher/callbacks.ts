import axios from "axios";
import { useRouter } from "next/router";

export default async function callbackFetcher(path: string) {
  await axios(path, {
    method: "get",
  }).then((res) => {
    return {
      success: true,
      token: res.data.token
    }
  })
  .catch(async(err) => {
    const res = await axios(String(process.env.NEXT_PUBLIC_BASE_URL)+`/api/account/getLogin`, {
      method: "get"
    }).then(res => res.data)

    return {
      success: false,
      loginLink: res.data
    }
  })
} 