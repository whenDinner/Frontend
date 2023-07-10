import { ReactNode } from "react"
import styled from "styled-components"

export default function Container(props: { children: ReactNode }) {
  return(
    <Body>
      {props.children}
    </Body>
  )
}

const Body = styled.div`
  position: relative;

  padding-top: calc(85px);

  max-width: 1200px;
  margin: 0px auto;
  transition: all 0.2s ease-in 0s;

  width: 100%;
  padding-bottom: 20px;
`