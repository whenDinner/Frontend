import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { QuickResponse } from "@/utils/interfaces";

export default function Home() {
  const [search, setSearch] = useState('') 
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState<number>(0);
  
  const getQuickResponse = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qrcode/get/codes?offset=${currentpage}&limit=10`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then((res) => {
      setItems(res.data.codes)
      setTotal(res.data.codes_cnt)
    }).catch((err) => {
      console.error(err)
    })
  }

  function onPageChange(page: number) {
    setCurrentpage(page)
    setItems([])
  }

  useEffect(() => {
    getQuickResponse();
  }, [currentpage, getQuickResponse]);

  return (
    <Container>
      <Card title="검색하기">
        <form action={`/qr/search/${search}`}>
          <input className="input" placeholder="QR 이름" onChange={(e) => setSearch(e.target.value)}></input>
          <Button type="submit" text="검색" color="#5d87ff" onClick={undefined} fontColor="#fff"></Button>
        </form>
      </Card>
      
      {items.map((value: QuickResponse, index: number) => (
        <Link href={`/qr/${value.uuid}`} key={index}>
          <Card key={index} title={value.name}>
            <li>uuid: {value.uuid}</li><br/>
            <Button type="button" text={value.action} color="#5d87ff" onClick={undefined} fontColor="#fff"></Button>
            createdAt: {value.createAt}
          </Card>
        </Link>
      ))}

      <Pagination onPageChange={onPageChange} totalPages={Math.floor(total / 10)} currentPage={currentpage} />
    </Container>
  )
}
