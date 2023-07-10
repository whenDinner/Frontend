import Card from "@/components/card";
import Container from "@/components/container";
import { FormEvent, useEffect, useRef, useState } from "react";

import Button from "@/components/button";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function Notice() {
  const router = useRouter();
  
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState<number>(0);

  async function getItems() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/get/posts?limit=10&offset=${currentpage}&type=${router.query.category}`, {
      method: 'get',
    }).then((res) => {
      setItems(res.data.posts)
      setTotal(res.data.posts_cnt)
    }).catch((err) => console.error(err))
  }

  function onPageChange(page: number) {
    setCurrentpage(page)
    setItems([])
  }

  const onDelete = async (id: number) => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/post/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        id
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

  useEffect(() => {
    getItems();
  }, [currentpage])

  return (
    <Container>
      {items ? items.map((value: any, index) => (
        <Card key={index}>
          <Link href={`/community/post/${value.id}`}>
            <Card title={value.title}>
              createdAt: {value.createdAt}
            </Card>
          </Link>
          <Button type="button" text="게시물 삭제" color="rgb(229, 44, 87)" fontColor="#fff" onClick={(e) => { e.preventDefault(); onDelete(value.id) }} />
        </Card>
      )) : <></>}

      <Pagination onPageChange={onPageChange} totalPages={Math.floor(total / 10)} currentPage={currentpage} />
    </Container>
  )
}