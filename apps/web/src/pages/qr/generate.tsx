import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Generate() {
  const router = useRouter();
  const [name, setName] = useState<string>('')
  const [action, setAction] = useState<'PLACE' | 'OUTGO' | 'WRITE'>('OUTGO')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/create`, {
      name,
      action
    }, {
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}` 
      }
    }).then((res) => {
      Swal.fire({
        title: 'Success',
        text: '정상적으로 Quick Response가 완성 되었습니다!',
        icon: 'success',
        didClose: () => {
          router.push(`/qr/${res.data.uuid}`)
        }
      })
    }).catch((err) => {
      Swal.fire({
        title: 'Error',
        text: err.response.data.message,
        icon: 'error',
      })
    })
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Card title="QR CODE GENERATE">
          <Card title="QR NAME">
            <input className="input" placeholder="QR 코드의 이름을 적어주세요." onChange={(e) => setName(e.target.value)} />
          </Card>

          <Card title="QR 사용 목적">
            <Button type="button" text="외출, 복귀 용 QR" color={action === 'OUTGO' ? "#5d87ff" : "#636366"} onClick={() => setAction('OUTGO')} fontColor="white" />
            <Button type="button" text="장소 기록 용 QR" color={action === 'PLACE' ? "#5d87ff" : "#636366"} onClick={() => setAction('PLACE')} fontColor="white" />
            <Button type="button" text="기록 용 QR" color={action === 'WRITE' ? "#5d87ff" : "#636366"} onClick={() => setAction('WRITE')} fontColor="white" />
          </Card>
          <Button type="submit" text="만들기" color={"#5d87ff"} onClick={undefined} fontColor="white" />
        </Card>
      </form>
    </Container>
  )
}