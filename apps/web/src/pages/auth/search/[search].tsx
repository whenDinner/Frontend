import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import Pagination from "@/components/Pagination";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState<number>(0);
  
  async function getUser() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/search/users?offset=${currentpage}&limit=10&search=${router.query.search}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setItems(res.data.user)
      setTotal(res.data.user_cnt)
    }).catch((err) => {
      console.error(err)
    })
  }

  function onPageChange(page: number) {
    setCurrentpage(page)
    setItems([])
  }

  useEffect(() => {
    getUser();
  }, [router.isReady, currentpage])

  if (!items)
    return (
      <Container>
        <Card title="ERROR!">
          <div>
            사소한 에러가 있었나 보군요!<br/>
            아래 해결 방법을 사용해보실래요?
            <br/><br/>
            1. <Link href="/" passHref>홈으로 돌아가기</Link><br/>
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
        {items && Object.values(items).map((value: any, index: number) => (
          <Card title={value.fullname} key={index}>
            <div>
              <li>uuid: {value.uuid}</li>
              <br/>
              <li>학번: {value.student_id}</li>
              <li>성별: {value.gender === "M" ? "남자" : "여자"}</li>
              <li>학년: {value.grade}</li>
              <li>반: {value.class}</li>
              <li>번호: {value.number}</li>
              <li>방 번호: {value.roomNumber}</li>
              <li>type: {value.type === 0 ? "교내 학생" : value.type === 1 ? "졸업생" : "관리자"}</li>
              <li>createdAt: {value.createdAt}</li>
            </div>
            <Link href={`/auth/user/update?uuid=${value.uuid}`}>
              <Button type="button" text="수정하기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
            </Link>
          </Card>
        ))}

      <Pagination onPageChange={onPageChange} totalPages={Math.floor(total / 10)} currentPage={currentpage} />

      </Container>
    )
  }
}
