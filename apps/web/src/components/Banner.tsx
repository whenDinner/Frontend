import styled from "styled-components"

export default function Banner() {
  return (
    <Body>
      <Image src="assets/gisuksa.jpeg" alt="Banner"></Image>
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
  display: flex;
  aspect-ratio: 16/9;
  object-fit: cover;
  width: 100%;
  height: 100vh;
`
