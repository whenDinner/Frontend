import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [search, setSearch] = useState<string>('');
  return (
    <Container>
      <Card title="OUTGO 층 선택">
        <Card>
          <Flex>
            <Width100>
              <Link href={"/outgo/2?gender=M"}>
                <Button type="button" text="2층 남자" color="#5d87ff" onClick={undefined} fontColor="#fff" />
              </Link>
              <Link href={"/outgo/3?gender=M"}>
                <Button type="button" text="3층 남자" color="#5d87ff" onClick={undefined} fontColor="#fff" />
              </Link>
              <Link href={"/outgo/2?gender=M"}>
                <Button type="button" text="4층 남자" color="#5d87ff" onClick={undefined} fontColor="#fff" />
              </Link>
            </Width100>
            <Width100>
              <Link href={"/outgo/2?gender=F"}>
                <Button type="button" text="2층 여자" color="#fbb1c2" onClick={undefined} fontColor="#fff" />
              </Link>
              <Link href={"/outgo/3?gender=F"}>
                <Button type="button" text="3층 여자" color="#fbb1c2" onClick={undefined} fontColor="#fff" />
              </Link>
              <Link href={"/outgo/4?gender=F"}>
                <Button type="button" text="4층 여자" color="#fbb1c2" onClick={undefined} fontColor="#fff" />
              </Link>
            </Width100>
          </Flex>
        </Card>
      </Card>
      <Card title="검색하기">
        <form action={`/outgo/search/${search}`}>
          <input className="input" placeholder="유저 이름" onChange={(e) => setSearch(e.target.value)}></input>
          <Button type="submit" text="검색" color="#5d87ff" onClick={undefined} fontColor="#fff"></Button>
        </form>
      </Card>
    </Container>
  )
}

const Flex = styled.div`
  display: flex;
`

const Width100 = styled.div`
  width: 100%;
`