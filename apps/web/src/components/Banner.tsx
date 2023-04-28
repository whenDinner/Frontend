import { GlobalProps } from "@/utils/interface"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

function firstRandomImageSelect() {
  const image_base = "/assets/gbsw_image"
  const arr = [
    `${image_base}/board1619182935953.jpg`, 
    `${image_base}/board1619183094662.jpg`, 
    `${image_base}/board1619183127459.jpg`,
    `${image_base}/board1619183174901.jpg`,
    `${image_base}/board1619183202478.jpeg`
  ]

  return arr[Math.floor(Math.random() * 4 + 1)]
}

export default function Banner({ size, tab }: GlobalProps) {
  const [image, setImage] = useState(firstRandomImageSelect())
  const [fade, setFade] = useState('normal');

  function randomImageSelect() {
    const image_base = "/assets/gbsw_image"
    const arr = [
      `${image_base}/board1619182935953.jpg`, 
      `${image_base}/board1619183094662.jpg`, 
      `${image_base}/board1619183127459.jpg`,
      `${image_base}/board1619183174901.jpg`,
      `${image_base}/board1619183202478.jpeg`
    ]
    let data = arr[Math.floor(Math.random() * 4 + 1)]
    while(data == image) {
      if (data !== image) break;
      data = arr[Math.floor(Math.random() * 4 + 1)]
    }
  
    return data
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFade('off')
      setImage(randomImageSelect());
      setTimeout(() => {
        setFade('on')
      }, 345)
    }, 3000)

    return () => clearInterval(interval);
  })

  return (
    <Body className={fade}>
      <Image src={image} alt="Banner" className={tab === "tab on" ? "on" : "off"}></Image>
    </Body>
  )
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Body = styled.div`
  position: fixed;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100vh;

  &.on {
    animation: ${fadeIn} .35s forwards;
  }

  &.off {
    animation: ${fadeOut} .35s forwards;
  }
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