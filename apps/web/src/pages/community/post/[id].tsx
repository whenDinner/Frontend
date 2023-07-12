import Card from "@/components/card";
import Container from "@/components/container";
import { useEffect, useState } from "react";

import Button from "@/components/button";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import xss from "xss";
import moment from "moment";

export default function Notice() {
  const router = useRouter();

  const [items, setItems] = useState<any>()

  const onSubmit = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/post/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        id: router.query.id
      }
    })
      .then(() => {
        Swal.fire({
          title: '게시글이 정상적으로 삭제되었습니다.',
          icon: 'success',
          didClose: () => {
            router.reload()
          }
        })
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          didClose: () => {
            router.reload()
          }
        })
      })
  }

  async function getItems() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/get/post?id=${router.query.id}`, {
      method: 'get',
    }).then((res) => {
      setItems(res.data.post)
    }).catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: 'error',
        didClose: () => {
          router.push('/community/notice')
        }
      })
    })
  }

  useEffect(() => {
    getItems();
  }, [router.isReady])

  return (
    <Container>
      {items ?
        <Card title={items.title}>
          작성 날짜: {moment(items.createdAt).format('YYYY년 MM월 DD일 HH시 mm분 ss초')}
          <Card>
            <div dangerouslySetInnerHTML={{ __html: xss(items.content) }}></div>
          </Card>
        </Card>
        :
        <Card title={"Loading..."}>
        </Card>
      }
      <Button type="button" text="게시물 삭제" color="rgb(229, 44, 87)" fontColor="#fff" onClick={(e) => { e.preventDefault(); onSubmit() }} />
    </Container>
  )
}