import { useState } from "react"
import Link from "next/link"
import styled, { keyframes } from "styled-components"
import { ItemComponentsProps } from "@/utils/interface";

export default function ItemComponents({ imagePath, href, title, size }: ItemComponentsProps) {
  const [hover, setHover] = useState("normal");

  return (
    <Body 
      onMouseOver={() => setHover(size.width <= 640 ? "left_hover" : "top_hover")} 
      onMouseOut={() => setHover(size.width <= 640 ? "left_unhover" : "top_unhover")} 
      className={hover}
    >
      <Link href={href}>
        <Half>
          <Image src={imagePath} alt="" />
          <div>
            <div>
              {title}
            </div>
          </div>
        </Half>
      </Link>
    </Body>
  )
}

const up = keyframes`
  0% {
    top: 0;
  }

  100% {
    top: -3%;
  }
`

const down = keyframes`
  0% {
    top: -3%;
  }

  100% {
    top: 0%;
  }
`

const left = keyframes`
  0% {
    left: 0;
  }

  100% {
    left: -3%;
  }
`

const right = keyframes`
  0% {
    left: -3%;
  }

  100% {
    left: 0%;
  }
`


const Body = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  height: 180px;
  margin-top: 15px;
  margin-left: 7.5px;
  margin-right: 7.5px;
  opacity: .9;
  border-radius: 3px;
  
  background-color: white;
  box-shadow: rgba(25, 25, 25, 0.467) 0px 0px 5px 0px;

  > a {
    width: 100%;
  }

  &.top_hover {
    animation: ${up} .3s forwards;
  }

  &.top_unhover {
    animation: ${down} .3s forwards;
  }

  &.left_hover {
    animation: ${left} .3s forwards;
  }

  &.left_unhover {
    animation: ${right} .3s forwards;
  }

  @media (max-width: 640px) {
    margin-left: 3%;
    margin-right: 0;
  }
`

const Half = styled.div`
  display: flex;
  height: 100%;

  > div, > img {
    width: 100%;
    height: 100%;
  }

  > div {
    position: relative;
    text-align: center;
    font-size: 24px;
    font-weight: 800;
  }

  > div > div {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Image = styled.img`
  aspect-ratio: 16/9;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`
