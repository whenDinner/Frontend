import { MouseEventHandler } from "react"
import styled from "styled-components"

export default function Button(props: { type: "button" | "submit", text: string, color: string, fontColor: string, onClick: MouseEventHandler<HTMLButtonElement> | undefined }) {
  return (
    <Body type={props.type} onClick={props.onClick ? props.onClick : undefined} style={{ backgroundColor: props.color, border: `1px solid ${props.color}`, color: props.fontColor }}>
      {props.text}
    </Body>
  )
}

const Body = styled.button`
  cursor: pointer;
  
  display: inline-block;
  margin: 0.25rem!important;
  padding: 7px 16px;
  
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  
  border-radius: 7px;
  
  box-shadow: unset;
  -webkit-appearance: button;
  text-transform: none;
`