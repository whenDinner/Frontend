import Card from "@/components/card";
import Container from "@/components/container";
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Notice() {
  const router = useRouter();
  
  const [items, setItems] = useState<any>()

  async function getItems() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/category/info`, {
      method: 'get',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setItems(res.data.info)
    }).catch((err) => console.error(err))
  }

  useEffect(() => {
    getItems();
  }, [router.isReady])

  return (
    <Container>
      <Card title="카테고리 선택">
        {items ? items.map((value: any, index:number) => (
          <Link href={`./posts/${value.value}`} key={index}>
            <Card title={value.label} key={index}>
              <p style={{ color: 'black' }}>
                게시글 갯수: {value.count}개
              </p>
            </Card>
          </Link>
        )) : <Card title="Loading..."><></></Card>}
      </Card>

    </Container>
  )
}