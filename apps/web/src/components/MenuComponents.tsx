import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

export default function MenuComponents() {
  const [tab, setTab] = useState("tab normal")
  const router = useRouter();
  return (
    <>
      <Nav>
        <Link href="/" passHref>
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
        <div>
          <Link href={router.asPath === "/outgo" ? "" : "/outgo"} passHref>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 546V216h330v330H120Zm0 390V606h330v330H120Zm390-390V216h330v330H510Zm0 390V606h330v330H510ZM180 486h210V276H180v210Zm390 0h210V276H570v210Zm0 390h210V666H570v210Zm-390 0h210V666H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z"/></svg>
            <div>OutGo</div>
          </Link>
        </div>
        <div>
          <Link href={router.asPath === "/board" ? "" : "/board"} passHref>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M80 776V218q0-14 13-28t27-14h519q15 0 28 13.5t13 28.5v356q0 14-13 28t-28 14H240L80 776Zm201 40q-14 0-27.5-14T240 774v-98h500V336h100q14 0 27 14t13 29v596L721 816H281Zm339-580H140v395l75-75h405V236Zm-480 0v395-395Z"/></svg>
            <div>게시판</div>
          </Link>
        </div>
        <div>
          <Link href={router.asPath === "/system" ? "" : "/system"} passHref>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z"/></svg>
            <div>system</div>
          </Link>
        </div>
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
    background-image: url(assets/symbol-only.png);
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
  position: fixed;
  top: 0;
  z-index: 100;
  left: -75%;

  width: 75%;
  text-align: center;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px 0 #19191977;
  
  padding-top: 38px;
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
