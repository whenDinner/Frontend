import { GlobalProps } from "@/utils/interface"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

export default function MenuComponents({ size }: GlobalProps) {
  const [tab, setTab] = useState("tab normal")
  const router = useRouter();
  return (
    <>
      <Nav>
        <Link href="/" passHref>
          <h1>whenDinner</h1>
        </Link>
        <div style={{ display: "flex"}}>
          <div className={size.width >= 1040 ? tab : "tab off"} onClick={() => setTab(tab === "tab on" ? "tab off" : "tab on")} />
        </div>
      </Nav>
      <div style={{ width: "100%", height: "70px", zIndex: "-1" }}></div>
      <Tab className={tab}>
        <Link href={"/"} passHref>
          <h1>whenDinner</h1>
        </Link>
        <TabList>
          
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
    background-image: url(/assets/symbol-only.png);
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
  flex-direction: row;
  flex-wrap: wrap;
  > div {
    width: 33.333333333333333%;
    height: 60px;
  }

  > div > a {
    text-align: center;
  }
`
