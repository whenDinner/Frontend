import { GlobalProps } from "@/utils/interface"
import Link from "next/link"
import React, { ReactNode } from "react"
import styled, { keyframes } from "styled-components"

function Item(props: { children: ReactNode }) {
  return (
    <ItemBody>
      {props.children}
    </ItemBody>
  )
}

export default function MenuComponents({ size, tab, update }: GlobalProps) {
  function setTab(text: string) {
    update({ type: "tab", tab: text })
  }

  return (
    <>
      <Nav>
        <Link href="/" passHref>
          <h1>whenDinner</h1>
        </Link>
        <div style={{ display: "flex"}}>
          {/* icon, 햄버거 메뉴 버튼 */}
          <div className={"tab"} onClick={() => setTab(tab === "tab on" ? "tab off" : "tab on")} /> 
        </div>
      </Nav>
      <div style={{ width: "100%", height: "70px", zIndex: "-1" }}></div>
      <Tab className={tab}>
        <Link href={"/"} passHref>
          <h1>whenDinner</h1>
        </Link>
        <TabList>
          <Item>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 10.05C19 10.05 19 10.02 19 10C19 6.69 16.31 4 13 4C10.36 4 8.13 5.7 7.32 8.07C7.05 8.03 6.78 8 6.5 8C3.46 8 1 10.46 1 13.5C1 16.54 3.46 19 6.5 19H18.5C20.99 19 23 16.98 23 14.5C23 12.19 21.25 10.3 19 10.05Z" fill="#88BFFF"/>
              </svg>
              <h1>정심관</h1>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 3H4.5C3.94772 3 3.5 3.44772 3.5 4V7C3.5 7.55228 3.94772 8 4.5 8H19.5C20.0523 8 20.5 7.55228 20.5 7V4C20.5 3.44772 20.0523 3 19.5 3Z" fill="#707070"/>
                <path d="M11.5 4.5H5.5C5.22386 4.5 5 4.72386 5 5V6C5 6.27614 5.22386 6.5 5.5 6.5H11.5C11.7761 6.5 12 6.27614 12 6V5C12 4.72386 11.7761 4.5 11.5 4.5Z" fill="#E8E8E8"/>
                <path d="M17.5 6.75C18.1904 6.75 18.75 6.19036 18.75 5.5C18.75 4.80964 18.1904 4.25 17.5 4.25C16.8096 4.25 16.25 4.80964 16.25 5.5C16.25 6.19036 16.8096 6.75 17.5 6.75Z" fill="#84CA00"/>
                <path d="M19.5 9.5H4.5C3.94772 9.5 3.5 9.94772 3.5 10.5V13.5C3.5 14.0523 3.94772 14.5 4.5 14.5H19.5C20.0523 14.5 20.5 14.0523 20.5 13.5V10.5C20.5 9.94772 20.0523 9.5 19.5 9.5Z" fill="#707070"/>
                <path d="M17.5 13.25C18.1904 13.25 18.75 12.6904 18.75 12C18.75 11.3096 18.1904 10.75 17.5 10.75C16.8096 10.75 16.25 11.3096 16.25 12C16.25 12.6904 16.8096 13.25 17.5 13.25Z" fill="#FFA36F"/>
                <path d="M19.5 16H4.5C3.94772 16 3.5 16.4477 3.5 17V20C3.5 20.5523 3.94772 21 4.5 21H19.5C20.0523 21 20.5 20.5523 20.5 20V17C20.5 16.4477 20.0523 16 19.5 16Z" fill="#707070"/>
                <path d="M17.5 19.75C18.1904 19.75 18.75 19.1904 18.75 18.5C18.75 17.8096 18.1904 17.25 17.5 17.25C16.8096 17.25 16.25 17.8096 16.25 18.5C16.25 19.1904 16.8096 19.75 17.5 19.75Z" fill="#84CA00"/>
                <path d="M11.5 11H5.5C5.22386 11 5 11.2239 5 11.5V12.5C5 12.7761 5.22386 13 5.5 13H11.5C11.7761 13 12 12.7761 12 12.5V11.5C12 11.2239 11.7761 11 11.5 11Z" fill="#E8E8E8"/>
                <path d="M11.5 17.5H5.5C5.22386 17.5 5 17.7239 5 18V19C5 19.2761 5.22386 19.5 5.5 19.5H11.5C11.7761 19.5 12 19.2761 12 19V18C12 17.7239 11.7761 17.5 11.5 17.5Z" fill="#E8E8E8"/>
              </svg>
              <h1>시스템</h1>
            </div>
          </Item>
        </TabList>
      </Tab>
    </>
  )
}

const rightTurn = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const leftTurn = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
`

const leftToRight = keyframes`
  0% {
    left: -75%;
  }

  100% {
    left: 0%;
  }
`

const rightToLeft = keyframes`
  0% {
    left: 0%;
  }

  100% {
    left: -75%;
  }
`

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  
  text-align: center;
  opacity: .9;
  z-index: 100;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f5;

  width: 100%;
  height: 70px;
  background-color: #fff;
  color: rgb(0,113,182);

  box-shadow: 0 0 5px 0 #19191977;

  display: flex;
  align-items: center;
  padding: 0 60px;

  div.tab {
    width: 60px;
    height: 60px;
    background-image: url(/assets/gbsw_image/symbol-only.png);
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    color: white;
    margin-left: 20px;
  }

  > div > div {
    animation: ${rightTurn} 30s infinite;
  }

  > a > h1 { 
    font-family: 'Sriracha', cursive;
    font-size: 32px;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    padding: 0 10px;
  }
`

const Tab = styled.div`
  transition: all .35s;
  position: fixed;
  top: 0;
  z-index: 100;
  left: -75%;

  width: 75%;
  text-align: center;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px 0 #19191977;
  
  padding-top: 28px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: .94;
  > a > h1 {
    font-family: 'Sriracha', cursive;
    font-size: 32px;
    font-weight: 700;
    color: rgb(0,113,182);
    border-bottom: 1px solid #313133;
    padding-bottom: 10px;
    margin-bottom: 20px;
    text-align: left;
  }

  &.on {
    animation: ${leftToRight} .35s forwards;
  }

  &.off {
    animation: ${rightToLeft} .35s forwards;
  }

  @media (min-width: 1040px) {
    left: -23%;

    width: 23%;
  }
`

const TabList = styled.div`
  display: flex;
  padding-left: 15px;
  height: 100%;
`

const ItemBody = styled.div`
  display: block;
  width: 100%;
  text-align: left;

  svg {
    position: relative;
    bottom: 2px;
    margin-right: 6px;
  }

  div {
    display: flex;
    padding-top: 8px;
    padding-bottom: 4px;
    margin-bottom: 18px;
    font-size: 19px;
    font-weight: 700;
    border-bottom: 1px solid black;
    cursor: pointer;
  }

  div:hover {
    transition: all .25s;
    background-color: #61616633;
  }
`