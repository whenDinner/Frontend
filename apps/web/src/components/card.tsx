import { ReactNode } from "react"
import styled from "styled-components"

export default function Card(props: { title?: string, children: ReactNode }) {
  return (
    <CardBody>
      <Body>
        {props.title ?
          <Title>{props.title}</Title>
          :
          <></>
        }
        {props.children}
      </Body>
    </CardBody>
  )
}

const CardBody = styled.div`
  margin-bottom: 30px;
  position: relative;
  display: flex;
  
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0px;

  overflow-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: rgba(145,158,171,0.2) 0px 0px 2px 0px,rgba(145,158,171,0.12) 0px 12px 24px -4px;
  border: 1px solid #ebf1f6;
  border-radius: 7px;
  margin: 24px;
`

const Body = styled.div`
  -webkit-box-flex: 1;
  padding: 30px 30px;
  flex: 1 1 auto;

  a {
    text-decoration: none;
    color: #005dff;
  }

  input.input {
    width: 100%;
    height: 36px;
    font-size: 16px;
    padding: 4px;
    margin: 0.25rem;
  }

  b {
    font-weight: 700;
  }
`

const Title = styled.h5`
  font-size: 18px;
  font-weight: 700 !important;
  margin-bottom: 1.5rem !important;
  color: #2A3547;

  margin: 0;
  padding: 0;
`