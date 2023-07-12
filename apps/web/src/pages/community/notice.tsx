import Card from "@/components/card";
import Container from "@/components/container";
import { FormEvent, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Button from "@/components/button";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function Notice() {
  const router = useRouter();
  const editorRef = useRef<SunEditorCore>();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState<number>(0);

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };

  const sunEditorOnChange = (content: string) => {
    setContent(content)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/post/insert`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        title,
        content,
        type: '공지'
      }
    })
      .then(() => {
        Swal.fire({
          title: '게시글이 정상적으로 작성되었습니다.',
          icon: 'success',
          didClose: () => {
            router.reload()
          }
        })
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error'
        })
      })
  }

  async function getItems() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/get/posts?limit=10&offset=${currentpage}&type=공지`, {
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
  }, [router.isReady, currentpage])

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Card title="공지사항">
          <b style={{ color: "red" }}>!주의: 공지사항에 글을 쓰면 모든 유저에게 알람이 갑니다.</b>

          <br /><br />
          선생님의 말씀을 전해주세요!
          <br /><br />
          <input className="input" placeholder="제목을 입력해주세요!" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br /><br />
          <SunEditor
            onChange={sunEditorOnChange}
            getSunEditorInstance={getSunEditorInstance}
            placeholder="게시글을 작성해주세요!"
          />
          <br />
          <Button type="submit" text="공지 올리기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
        </Card>
      </form>

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