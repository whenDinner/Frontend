import MenuComponents from "@/components/MenuComponents";
import styled from "styled-components";
import { GlobalProps } from "@/utils/interface";

export default function Home({ size, tab, update }: GlobalProps) {
  return (
    <div>
      <ErrorTitle>
        <h1>{"¯\\_(ツ)_/¯"}</h1>
        <h1>not found</h1>
        <p>혹시 모르니까 다음에 연결해보죠?</p>
      </ErrorTitle>
      <MenuComponents size={size} tab={tab} update={update}/>
    </div>
  )    
}

const ErrorTitle = styled.div`
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  > h1 {
    background: url(/assets/gbsw_image/board1619183202478.jpeg) center no-repeat;
  
    text-align: center;
    font-weight: 700;
    font-size: 68px;
    letter-spacing: 4px;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }

  > p {
    text-align: center;
    margin-top: 12px;
    font-size: 18px;
  }
  

`