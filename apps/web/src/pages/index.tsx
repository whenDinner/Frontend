import MenuComponents from "@/components/MenuComponents";
import Link from "next/link";
import styled from "styled-components";
import Banner from "@/components/Banner";
import ItemComponents from "@/components/ItemComponents";
import { GlobalProps } from "@/utils/interface";

export default function Home({ size }: GlobalProps) {
  return (
    <div>
      <Banner />
      <Main>
        <Items>
          <ItemComponents size={size} title={"OutGo"} imagePath={"symbol-only.png"} href={"/outgo"} />
          <ItemComponents size={size} title={"게시판"} imagePath={"symbol-only.png"} href={"/board"} />
          <ItemComponents size={size} title={"system"} imagePath={"symbol-only.png"} href={"/system"} />
        </Items>
      </Main>

      <MenuComponents />
    </div>
  )    
}

const Main = styled.main`
  > h1 {
    font-size: 21px;
    font-weight: 900;
    border-bottom: 1px solid black;
    padding-bottom: 14px;
  }
`

const Items = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 10%;
  @media (max-width: 640px) {
    display: block;
    width: 100%;
  }
`