import MenuComponents from "@/components/MenuComponents";
import styled, { keyframes } from "styled-components";
import Banner from "@/components/Banner";
import { GlobalProps } from "@/utils/interface";

export default function Home({ size, user, tab, update }: GlobalProps) {
  return (
    <div>
      <Banner size={size} tab={tab} update={update} />
      <Main>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GBSW src="/assets/gbsw_image/symbol-only.png" />
          <h1 style={{ textAlign: 'center' }}>정심관</h1>
        </div>
      </Main>
      <MenuComponents size={size} tab={tab} update={update} />
    </div>
  )    
}

const fade = keyframes`
  0% {
    opacity: .1;
  }

  100% {
    opacity: .9;
  }
`

const Main = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  width: 70%;
  background-color: white;
  height: auto;

  opacity: .1;
  animation: ${fade} .4s forwards;

  > div {
    padding: 20px;
  }
`

const GBSW = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%); 

  width: 80px;
  height: 80px;

  margin-bottom: 20px;
`