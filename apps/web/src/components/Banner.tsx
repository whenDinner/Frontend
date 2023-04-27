import { GlobalProps } from "@/utils/interface"
import styled from "styled-components"

export default function Banner({ size, tab }: GlobalProps) {
  return (
    <Body>
      <Image src="/assets/gisuksa.jpeg" alt="Banner" className={tab === "tab on" ? "on" : "off"}></Image>
    </Body>
  )
}

const Body = styled.div`
  position: fixed;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Image = styled.img`
  transition: all .35s;
  display: flex;
  aspect-ratio: 16/9;
  object-fit: cover;
  width: 100%;
  height: 100%;

  @media (max-width: 1040px) {
    &.on {
      width: 175%;
    }
  }

  @media (min-width: 1040px) {
    &.on {
      width: 123%;
    }
  }
`