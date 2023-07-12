import { TabType } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"

export default function Nav({ update }: { update: Dispatch<SetStateAction<TabType>> }) {
  return (
    <Header>
      <NavBody>
        <ul>
          <li>
            <a onClick={() => update('tab-on')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0107 5V16H4.01074V5H20.0107ZM20.0107 3H4.01074C2.91074 3 2.01074 3.9 2.01074 5V16C2.01074 17.1 2.91074 18 4.01074 18H20.0107C21.1107 18 22.0107 17.1 22.0107 16V5C22.0107 3.9 21.1107 3 20.0107 3Z" fill="#333333" />
                <path d="M16.2905 22.0008H7.73047L9.04047 16.7607L10.9805 17.2408L10.2905 20.0008H13.7305L13.0405 17.2408L14.9805 16.7607L16.2905 22.0008Z" fill="#333333" />
                <path d="M21.0107 13H3.01074V15H21.0107V13Z" fill="#333333" />
              </svg>
            </a>
          </li>
        </ul>
        <div>
          <ul>
            <li>
              <a href="https://gbsw.hs.kr"><img src="/assets/gbsw_image/symbol-only.png" /></a>
            </li>
          </ul>
        </div>
      </NavBody>
    </Header>
  )
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  
  box-sizing: border-box;
  
  width: 100%;
  background: #fff;
  padding: 0 25px;

  display: block;
`

const NavBody = styled.nav`
  display: flex;
  position: relative;
  align-items: center;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  justify-content: space-between;

  min-height: 70px;
  padding: 0;

  > ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    display: flex;
    margin-top: 0;
  }

  > ul > li {
    display: block !important;
    text-align: -webkit-match-parent;
  }

  > ul > li > a {
    padding: 8px 16px;
    line-height: 70px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    font-size: 20px;
    z-index: 2;
    cursor: pointer;
  }

  > div {
    display: block;
    padding-right: 0!important;
    padding-left: 0!important;
    -webkit-box-pack: end!important;
    flex-basis: 100%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -webkit-box-align: center;
  }

  > div > ul {
    margin-left: auto!important;
    -webkit-box-align: center!important;
    align-items: center!important;
    -webkit-box-orient: horizontal!important;
    -webkit-box-direction: normal!important;
    flex-direction: row!important;
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    float: right;
  }

  > div > ul > li {
    position: releative;
    display: list-item;
    text-align: -webkit-match-parent;
  }

  > div > ul > li > a {
    padding: 8px 16px;
    line-height: 70px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    font-size: 20px;
    z-index: 2;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  > div > ul > li > a > img {
    border-radius: 50%!important;
    vertical-align: middle;
    width: 35px;
    aspect-ratio: auto 35 / 35;
    height: 35px;
    overflow-clip-margin: content-box;
    overflow: clip;
  }

  @media (min-width: 992px) {
    flex-wrap: nowrap;
    -webkit-box-pack: start;
    justify-content: flex-start;

    > ul {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }
  }

  @media (min-width: 991.98px) {
    flex-wrap: nowrap;

    > ul {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }
  }

  @media (min-width: 767.98px) {
    > div > ul > li {
      position: static;
    }
  }
`