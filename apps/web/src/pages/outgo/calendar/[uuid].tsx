import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState<any>()

  async function getCalendar() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/outgo/get/calendar?uuid=${router.query.uuid}`, {
      method: 'get'
    }).then((res) => {
      setItems(res.data.calendar)
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getCalendar();
  }, [])

  if (!items)
    return (
      <Container>
        <Card title="ERROR!">
          <div>
            사소한 에러가 있었나 보군요!<br />
            아래 해결 방법을 사용해보실래요?
            <br /><br />
            1. <Link href="/" passHref>홈으로 돌아가기</Link><br />
            2. 데이터가 없음
            3. 관리자에게 문의하기. (최태혁)
          </div>
        </Card>
      </Container>
    )
  else {
    return (
      <Container>
        <div onClick={() => router.back()}>
          <Button type="button" text="뒤로가기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
        </div>
        <Card title={items.type}>
          <div>
            <li>uuid: {items.uuid}</li><br />
            <li>createdAt: {items.date}</li>
          </div>
          <br />
        </Card>

      </Container>
    )
  }
}
