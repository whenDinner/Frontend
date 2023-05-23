import { TabProps } from "@/utils/interfaces"
import styled from "styled-components"

export default function Tab({ tab, update }: TabProps) {
  return (
    <TabBody className={tab}>
      <div>
        <Top>
          <a href="/"><h1>whenDinner</h1></a>
          <div onClick={() => update('tab-off')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
        </Top>
        <Items>

        </Items>
      </div>
    </TabBody>
  )
}

const TabBody = styled.aside`
  display: block;
  position: fixed;
  top: 0;
  background-color: #fff;
  border-right: 1px solid rgb(229,234,239);
  
  width: 270px;
  height: 100%;
  
  
  transition: 0.15s ease-in;
  z-index: 11;
  
  &.tab-on {
    left: 0;
  }

  &.tab-off {
    left: -270px;
  }

  @media (max-width: 1199px) {
    left: 0;
  }
  
  @media (max-width: 1199px) {
    left: -270px;
  }
`

const Top = styled.div`
  min-height: 70px;
  padding: 0 24px;

  -webkit-box-align: center !important;
  align-items: center !important;

  -webkit-box-pack: justify !important;
  justify-content: space-between!important;

  display: flex !important;

  > a {
    white-space: nowrap !important;
    text-decoration: none;
    color: black;
  }
  
  > div {
    cursor: pointer;
    display: block !important;
    margin: 0;
    padding: 0;
  }

  > div > svg {
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;  
  }
`

const Items = styled.div`
  overflow-y: auto;
  padding: 0 24px;
  height: calc(100vh - 80px);
  border-radius: 7px;
  display: block;
`