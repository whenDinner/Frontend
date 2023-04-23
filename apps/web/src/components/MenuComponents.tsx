import Link from "next/link"
import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

export default function MenuComponents({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState("tab normal")
  return (
    <>
      <Nav>
        <Link href="/">
          <h1>whenDinner</h1>
        </Link>
        <div style={{ display: "flex"}}>
          <div className={tab} onClick={() => setTab(tab === "tab on" ? "tab off" : "tab on")} />
        </div>
      </Nav>
      <div style={{ width: "100%", height: "70px", zIndex: "-1" }}></div>
      <Tab className={tab}>
        <Link href={"/"} passHref>
          <h1>whenDinner</h1>
        </Link>
        <TabList>
          {children}
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

  box-shadow: 0 0 5px 0 #19191977;

  display: flex;
  align-items: center;
  padding: 0 60px;

  div.tab {
    width: 60px;
    height: 60px;
    background-image: url(symbol-only.png);
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    color: white;
    margin-left: 20px;
  }

  > div > div.on {
    animation: ${rightTurn} .38s forwards;
  }

  > div > div.off {
    animation: ${leftTurn} .38s forwards;
  }

  > a > h1 { 
    font-family: 'Alkatra', cursive !important;
    font-size: 32px;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    padding: 0 10px;
  }
`

const Tab = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  left: -75%;

  width: 75%;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px 0 #19191977;
  
  padding-top: 38px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: .94;
  > a > h1 {
    font-family: 'Alkatra', cursive !important;
    font-size: 32px;
    font-weight: 700;
    border-bottom: 1px solid #313133;
    margin-bottom: 20px;
  }

  &.on {
    animation: ${leftToRight} .35s forwards;
  }

  &.off {
    animation: ${rightToLeft} .35s forwards;
  }
`

const TabList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > div {
    width: 33.333333333333333%;
    height: 60px;
  }

  > div > a {
    padding:
    text-align: center;
  }
`
