import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import { User } from "@/utils/interfaces";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState<User>()
  const [fullname, setFullname] = useState('');
  const [student_id, setStudentId] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [roomNumber, setRoomNumber] = useState(0);
  const [type, setType] = useState(0);
  
  async function getUser() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/get/user?uuid=${router.query.uuid}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setFullname(res.data.user.fullname)
      setStudentId(res.data.user.student_id)
      setGender(res.data.user.gender)
      setRoomNumber(res.data.user.roomNumber)
      setType(res.data.user.type)

      setItems(res.data.user)
    }).catch((err) => {
      router.back();
      console.error(err)
    })
  }

  async function updateUser(e: FormEvent) {
    e.preventDefault();
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/update/user?uuid=${router.query.uuid}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        fullname,
        gender,
        student_id,
        roomNumber,
        type
      }
    }).then((res) => {
      Swal.fire({
        text: res.data.message,
        icon: 'success',
        didClose: () => {
          router.reload()
        }
      })
    })
  }

  useEffect(() => {
    getUser();
  }, [router.isReady])

  if (!router.query.uuid || !items)
    return (
      <Container>
        <Card title="ERROR!">
          <div>
            사소한 에러가 있었나 보군요!<br/>
            아래 해결 방법을 사용해보실래요?
            <br/><br/>
            1. <Link href="/" passHref>홈으로 돌아가기</Link><br/>
            2. 관리자에게 문의하기. (최태혁)
          </div>
        </Card>
      </Container>
    )
  else {
    
    return (
      <Container>
        <div onClick={() => router.back()}>
          <Button type="button" text="뒤로가기" color="#5d87ff" onClick={undefined} fontColor="#fff" />
        </div>
        <Card title={items.fullname}>
          <form onSubmit={updateUser}>
            <li>uuid: {items.uuid}</li>
            <br/>
            <Card title={`이름: ${items.fullname}`}>
              <InputText type="text" maxLength={5} value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </Card>
            <Card title={`학번: ${items.student_id}`}>
              <InputText type="text" maxLength={4} value={student_id} onChange={(e) => setStudentId(e.target.value)} />
            </Card>
            <Card title={`성별: ${items.gender === "M" ? "남자" : "여자"}`}>
              <Button type="button" text="남자" color={gender === "M" ? "#5d87ff" : "#636366"} onClick={(e) => { e.preventDefault(); setGender('M')}} fontColor="white" />
              <Button type="button" text="여자" color={gender === "F" ? "#fbb1c2" : "#636366"} onClick={(e) => { e.preventDefault(); setGender('F')}} fontColor="white" />
            </Card>
            <Card title={`방 번호: ${items.roomNumber}`}>
              <InputText type="text" maxLength={3} value={roomNumber} onChange={(e) => setRoomNumber(parseInt(e.target.value))} />
            </Card>
            <Card title={`학생 권한: ${items.type === 0 ? "교내 학생" : items.type === 1 ? "졸업생" : "관리자"}`}>
              <Button type="button" text="재학생" color={type === 0 ? "#5d87ff" : "#636366"} onClick={(e) => { e.preventDefault(); setType(0)}} fontColor="white" />
              <Button type="button" text="졸업생" color={type === 1 ? "#5d87ff" : "#636366"} onClick={(e) => { e.preventDefault(); setType(1)}} fontColor="white" />
              <Button type="button" text="관리자" color={type === 2 ? "#5d87ff" : "#636366"} onClick={(e) => { e.preventDefault(); setType(2)}} fontColor="white" />
            </Card>
            <li>createdAt: {items.createdAt}</li>
          </form>
          <Button type="submit" text="업데이트" color="#5d87ff" onClick={updateUser} fontColor="#fff" />
        </Card>
      </Container>
    )
  }
}

const InputText = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
`
