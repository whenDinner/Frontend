import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [value, setItems] = useState<any>()

  async function getQuickResponse() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/get/user?uuid=${router.query.uuid}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${getCookie('whenDinner-session')}`
      }
    }).then(async (res) => {
      setItems(res.data)
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getQuickResponse();
  }, [])

  if (!value) return (
    <Container>
      <div onClick={() => router.back()}>
        <Button type="button" text="뒤로가기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
      </div>
      <Card title="Loading..">
      </Card>
    </Container>
  )

  return (
    <Container>
      <div onClick={() => router.back()}>
        <Button type="button" text="뒤로가기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
      </div>
      <Card title={value.user.fullname}>
        <div>
          <li>학번: {value.user.student_id}</li>
          <li>성별: {value.user.gender === "M" ? "남자" : "여자"}</li>
          <li>방 번호: {value.user.roomNumber}</li>
          <li>type: {value.user.type === 0 ? "교내 학생" : value.user.type === 1 ? "졸업생" : "관리자"}</li>
          <Card title="잔류 | 귀가">
            <Button type="button" text="선택 안함" color={value.user.rh === 0 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="잔류" color={value.user.rh === 1 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="귀가" color={value.user.rh === 2 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
          </Card>
          <Card title="Outgo">
            <Button type="button" text="잔류" color={value.user.gs === 0 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="외출" color={value.user.gs === 1 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="외박" color={value.user.gs === 2 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="귀가" color={value.user.gs === 3 ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
          </Card>
          {value.user.gs === 1 ?
            <Card title="외출">
              <Button type="button" text="토요일" color={value.outgo.sat_pm ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white"></Button>
              <Button type="button" text="일요일 오전" color={value.outgo.sun_am ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white"></Button>
              <Button type="button" text="일요일 오후" color={value.outgo.sun_pm ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white"></Button>
            </Card>
            :
            <></>
          }
          {value.user.gs === 2 ?
            <Card title="외박">
              <Button type="button" text="금요일" color={value.outgo.fri_out ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white"></Button>
              <Button type="button" text="토요일" color={value.outgo.sat_pm ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white"></Button>
            </Card>
            :
            <></>
          }
          <Card title="학생 위치">
            <Button type="button" text="기숙사 내" color={value.user.isOuting === false ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
            <Button type="button" text="외출, 복귀 중" color={value.user.isOuting === true ? "#5d87ff" : "#636366"} onClick={undefined} fontColor="white" />
          </Card>
        </div>
      </Card>
    </Container>
  )
}
