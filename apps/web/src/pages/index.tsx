import MenuComponents from "@/components/MenuComponents";
import styled from "styled-components";
import Banner from "@/components/Banner";
import { GlobalProps } from "@/utils/interface";

export default function Home({ size, user }: GlobalProps) {
  return (
    <div>
      <Banner />

      <MenuComponents size={size} />
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