import Pagination from "@/components/Pagination";
import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import { QuickResponse } from "@/utils/interfaces";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function QR() {
  const router = useRouter();
  const [item, setItem] = useState<QuickResponse | any>()
  const [quick, setImage] = useState()
  const [datas, setData] = useState<any>()
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState<number>(0);

  const getQuickResponseArray = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/access/get?uuid=${router.query.code}&limit=10&offset=${currentpage}`, {
      method: 'get',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setData(res.data)
      setTotal(res.data.users_cnt)
    }).catch((err) => {
      console.error(err)
    })
  }

  const getQuickResponse = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/getInfo?uuid=${router.query.code}`,{
      method: 'GET',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setItem(res.data.QuickResponse)
    }).catch((err) => {
      console.error(err)
    })

    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/get?uuid=${router.query.code}&dataType=todataurl`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setImage(res.data.data)
    }).catch((err) => {
      console.error(err)
    })
  }

  const deleteSubmit = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        id: router.query.code
      }
    }).then(() => {
      Swal.fire({
        title: '정상적으로 QR 코드가 삭제되었습니다.',
        icon: "success",
        didClose: () => {
          router.push('/qr/list')
        }
      })
    }).catch((err) => {
      Swal.fire({
        title: 'Error',
        text: err.response.data.message,
        icon: "error",
        didClose: () => {
          router.reload()
        }
      })
    })
  }

  const clearSubmit = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/access/clear`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      },
      data: {
        uuid: item.uuid,
        action: item.action
      }
    }).then((res) => {
      Swal.fire({
        title: "정상적으로 초기화가 되었습니다.",
        icon: 'success',
        didClose: () => {
          router.reload()
        }
      })
    }).catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: 'error',
        didClose: () => {
          router.reload()
        }
      })
    })
  }

  function onPageChange(page: number) {
    setCurrentpage(page)
    setData([]);
  }

  useEffect(() => {
    getQuickResponse()
    getQuickResponseArray()
  }, [router.isReady])
  if (!item) {
    return (
      <Container>
        <div onClick={() => router.back()}>
          <Button type="button" text="뒤로가기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
        </div>
        <Card title={`Quick Response: Loading..`}>
          <img src={!quick ? undefined : quick} width={190} height={190} />
          <br/>
        </Card>
      </Container>
    )
  }
  return (
    <Container>
      <div onClick={() => router.back()}>
        <Button type="button" text="뒤로가기" color="#5d87ff" fontColor="#fff" onClick={undefined} />
      </div>
      <Card title={`Quick Response: ${item.name}`}>
        <img src={!quick ? undefined : quick} width={190} height={190} />
        <br/>
        
        <li>uuid: {item.uuid}</li>
        <li>사용목적: {item.action}</li><br/>
        createdAt: {item.createdAt}
        
        <br/><br/>
        <Button type="button" text="삭제" color="rgb(229, 44, 87)" fontColor="#fff" onClick={(e) => { e.preventDefault(); deleteSubmit() }}></Button>
      </Card>

      <Button type="button" text="초기화" color="rgb(229, 44, 87)" fontColor="#fff" onClick={(e) => { e.preventDefault(); clearSubmit() }} />
      <Card title={`총: ${datas?.users_cnt ? datas?.users_cnt : 0}명 (번)`}>
        <></>
      </Card>

      {datas ? datas.users.map((value: any, index: number) => (
        <Card title={value.author.fullname} key={index}>
          신청 시간: {moment(value.createdAt).format('YYYY년 MM월 DD일 HH시 mm분 ss초')}
        </Card>
      )): <></>}

      <Pagination onPageChange={onPageChange} totalPages={Math.floor(total / 10)} currentPage={currentpage} />
    </Container>
  )
}