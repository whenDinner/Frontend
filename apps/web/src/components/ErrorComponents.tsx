import styled from "styled-components"
import Link from "next/link"
import { ErrorComponentsProps } from "@/utils/interface"

export default function ErrorComponents({ title, desc }: ErrorComponentsProps) {
  return (
    <Body>
      <div></div>
      <div className="texts">
        <Link href={"/"} passHref>
          <Title>{title}</Title>
        </Link>
        <Desc>{desc}</Desc>
      </div>
    </Body>
  )
}

const Body = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  width: 100%;
`

const Title = styled.h1`
  font-size: 9rem;
  margin: 0;
  font-weight: 900;
  text-decoration: underline;
  text-decoration-color: black;
  text-decoration-thickness: 1px;
  background: url(gisuksa.jpeg) center no-repeat;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  @media (max-width: 790px) {
    font-size: 7rem;
  }

  @media (max-width: 560px) {
    font-size: 5rem;
  }

  @media (max-width: 400px) {
    font-size: 4rem;
  }
`

const Desc = styled.p`
  margin-top: 20px;
  font-size: 25px;
  font-weight: 600;

  @media (max-width: 790px) {
    font-size: 20px;
  }

  @media (max-width: 560px) {
    font-size: 15px;
  }
`
