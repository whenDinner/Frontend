import { TabProps } from "@/utils/interfaces"
import Link from "next/link"
import { ReactNode } from "react"
import styled from "styled-components"

interface TabItemProps {
  name: string,
  href: string,
  children: JSX.Element | ReactNode
}

function TabItem({ name, href, children }: TabItemProps) {
  return (
    <Link href={href}>
      <li className="item">
        <span className="icon">
          {children}
        </span>
        <span>{name}</span>
      </li>
    </Link>
  )
}

export default function Tab({ tab, update }: TabProps) {
  return (
    <>
      <TabBody className={tab}>
        <div>
          <Top>
            <Link href="/" passHref><h1>whenDinner</h1></Link>
            <div onClick={() => update('tab-off')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12" fill="#fff"></path>
                <path d="M6 6l12 12" fill="#fff"></path>
              </svg>
            </div>
          </Top>
          <Items>
            <ul>
              <li className="category">
                <span>auth 학생들</span>
              </li>
              <TabItem href={"/auth/user"} name={"유저 체크"}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9C7.06087 9 8.07827 9.42142 8.82841 10.1716C9.57856 10.9217 10 11.9391 10 13V18C10 18.2652 9.89464 18.5196 9.70711 18.7071C9.51957 18.8946 9.26522 19 9 19H3C2.73478 19 2.48043 18.8946 2.29289 18.7071C2.10536 18.5196 2 18.2652 2 18V13C2 11.9391 2.42142 10.9217 3.17157 10.1716C3.92172 9.42142 4.93913 9 6 9Z" fill="#C7CED5" />
                  <path d="M6 8C7.38071 8 8.5 6.88071 8.5 5.5C8.5 4.11929 7.38071 3 6 3C4.61929 3 3.5 4.11929 3.5 5.5C3.5 6.88071 4.61929 8 6 8Z" fill="#C7CED5" />
                  <path d="M21 19H15C14.7348 19 14.4804 18.8946 14.2929 18.7071C14.1053 18.5196 14 18.2652 14 18V13C14 11.9391 14.4214 10.9217 15.1716 10.1716C15.9217 9.42142 16.9391 9 18 9C19.0609 9 20.0783 9.42142 20.8284 10.1716C21.5786 10.9217 22 11.9391 22 13V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19Z" fill="#C7CED5" />
                  <path d="M18 8C19.3807 8 20.5 6.88071 20.5 5.5C20.5 4.11929 19.3807 3 18 3C16.6193 3 15.5 4.11929 15.5 5.5C15.5 6.88071 16.6193 8 18 8Z" fill="#C7CED5" />
                  <path d="M11.1201 12H12.8701C13.931 12 14.9484 12.4214 15.6985 13.1716C16.4487 13.9217 16.8701 14.9391 16.8701 16V21C16.8701 21.2652 16.7648 21.5196 16.5772 21.7071C16.3897 21.8946 16.1353 22 15.8701 22H8.12012C7.8549 22 7.60055 21.8946 7.41301 21.7071C7.22547 21.5196 7.12012 21.2652 7.12012 21V16C7.12012 14.9391 7.54154 13.9217 8.29169 13.1716C9.04183 12.4214 10.0593 12 11.1201 12Z" fill="#6B758F" />
                  <path d="M12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11Z" fill="#6B758F" />
                </svg>
              </TabItem>
              <Link href={"/auth/user"} passHref>
              </Link>
              <li className="category">
                <span>outgo 외출, 복귀</span>
              </li>
              <Link href={"/outgo/status"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" fill="#E7ECEF" />
                      <path d="M10.49 8H6.5C6.22386 8 6 8.22386 6 8.5V9.5C6 9.77614 6.22386 10 6.5 10H10.49C10.7661 10 10.99 9.77614 10.99 9.5V8.5C10.99 8.22386 10.7661 8 10.49 8Z" fill="#C7CED5" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 8.58579L17.293 6.29289L18.7072 7.70711L15.0001 11.4142L12.293 8.70711L13.7072 7.29289L15.0001 8.58579Z" fill="#48AFBA" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 14.5858L17.293 12.2929L18.7072 13.7071L15.0001 17.4142L12.293 14.7071L13.7072 13.2929L15.0001 14.5858Z" fill="#48AFBA" />
                      <path d="M10.4998 14H6.50977C6.23362 14 6.00977 14.2239 6.00977 14.5V15.53C6.00977 15.8061 6.23362 16.03 6.50977 16.03H10.4998C10.7759 16.03 10.9998 15.8061 10.9998 15.53V14.5C10.9998 14.2239 10.7759 14 10.4998 14Z" fill="#C7CED5" />
                    </svg>
                  </span>
                  <span>학생들 외출, 복귀 상태</span>
                </li>
              </Link>
              <Link href={"/outgo/calendar"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" fill="#E7ECEF" />
                      <path d="M10.49 8H6.5C6.22386 8 6 8.22386 6 8.5V9.5C6 9.77614 6.22386 10 6.5 10H10.49C10.7661 10 10.99 9.77614 10.99 9.5V8.5C10.99 8.22386 10.7661 8 10.49 8Z" fill="#C7CED5" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 8.58579L17.293 6.29289L18.7072 7.70711L15.0001 11.4142L12.293 8.70711L13.7072 7.29289L15.0001 8.58579Z" fill="#48AFBA" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 14.5858L17.293 12.2929L18.7072 13.7071L15.0001 17.4142L12.293 14.7071L13.7072 13.2929L15.0001 14.5858Z" fill="#48AFBA" />
                      <path d="M10.4998 14H6.50977C6.23362 14 6.00977 14.2239 6.00977 14.5V15.53C6.00977 15.8061 6.23362 16.03 6.50977 16.03H10.4998C10.7759 16.03 10.9998 15.8061 10.9998 15.53V14.5C10.9998 14.2239 10.7759 14 10.4998 14Z" fill="#C7CED5" />
                    </svg>
                  </span>
                  <span>잔류, 귀가 리스트 넣기</span>
                </li>
              </Link>
              <li className="category">
                QR-SYSTEM QR코드
              </li>
              <Link href={"/qr/generate"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.08664 5.18651C8.22428 6.07383 7.35587 7.50805 6.75858 9.28963L6.75534 9.29929C5.74022 12.2473 5.75033 14.3788 6.11772 15.8818C6.18984 15.7847 6.26165 15.6862 6.33314 15.5865C7.83388 13.4927 9.07523 10.9908 9.82944 8.74653C10.623 6.31921 10.6115 5.03487 10.5026 4.44106C10.4907 4.37621 10.4777 4.31992 10.4645 4.27142C10.1684 4.33009 9.70398 4.55131 9.08664 5.18651ZM11.2029 3.09723L11.8891 2.05244L11.7624 1.96923L11.6195 1.91871C9.98554 1.34102 8.3982 2.30782 7.29384 3.44414C6.11755 4.65447 5.07902 6.43661 4.38988 8.49009C3.02832 12.4469 3.21132 15.4088 4.02481 17.5612C4.08858 17.7299 4.15588 17.8928 4.22613 18.0498C3.33593 18.8967 2.43613 19.5104 1.57178 19.8256L2.42827 22.1743C3.54636 21.7666 4.60958 21.0656 5.59562 20.1869C6.10788 20.7674 6.60902 21.1685 6.97368 21.4206L6.97688 21.4228C7.34507 21.6756 7.79536 21.7843 8.24179 21.7229C8.68768 21.6616 9.0901 21.4363 9.37611 21.0976L11.5982 18.4181L12.2452 20.4048C12.3375 20.6921 12.5045 20.9524 12.7324 21.1567C12.9624 21.3628 13.2454 21.5037 13.5523 21.5612C13.8596 21.6188 14.1761 21.59 14.4672 21.4788C14.758 21.3678 15.0104 21.1797 15.1998 20.9379L15.209 20.9261L16.9498 18.5896L17.5173 20.4432L17.5208 20.4545C17.6126 20.7444 17.7804 21.0072 18.01 21.213C18.24 21.4191 18.523 21.56 18.8299 21.6175C19.1372 21.6751 19.4537 21.6462 19.7448 21.5351C20.0356 21.424 20.288 21.236 20.4774 20.9941L20.4872 20.9816L23.0036 17.5931L20.9965 16.1026L19.4432 18.1942L18.8767 16.3438C18.7894 16.0479 18.6228 15.7783 18.391 15.5672C18.1551 15.3522 17.8615 15.2069 17.5431 15.1518C17.2243 15.0967 16.8973 15.1349 16.6008 15.2606C16.3126 15.3827 16.067 15.5813 15.8876 15.8309L14.1461 18.1683L13.528 16.2708C13.4401 15.9852 13.2778 15.7249 13.0543 15.5193C12.8239 15.3073 12.5381 15.1624 12.2276 15.1034C11.9169 15.0443 11.5961 15.0742 11.3017 15.1893C11.0196 15.2996 10.7753 15.4828 10.591 15.7162L7.89625 18.9658C7.72027 18.806 7.52855 18.6102 7.33578 18.3747C7.69445 17.9457 8.03806 17.4992 8.36509 17.0429C10.0189 14.7356 11.3717 12.0071 12.2009 9.53774L12.204 9.52848C13.0692 6.88392 13.1741 5.14821 12.9615 3.98983C12.8536 3.40202 12.6635 2.96213 12.4505 2.63929C12.3449 2.47931 12.2374 2.35369 12.1387 2.25679C12.0896 2.20854 12.0431 2.16793 12.0009 2.13408C11.9798 2.11717 11.9598 2.10199 11.9411 2.08841C11.9318 2.08163 11.9228 2.07525 11.9141 2.06926L11.9013 2.06056L11.8952 2.05643L11.8921 2.05442C11.8906 2.05342 11.8891 2.05244 11.2029 3.09723Z" fill="#6B758F" />
                    </svg>
                  </span>
                  <span>QR 만들기</span>
                </li>
              </Link>
              <Link href={"/qr/list"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.08664 5.18651C8.22428 6.07383 7.35587 7.50805 6.75858 9.28963L6.75534 9.29929C5.74022 12.2473 5.75033 14.3788 6.11772 15.8818C6.18984 15.7847 6.26165 15.6862 6.33314 15.5865C7.83388 13.4927 9.07523 10.9908 9.82944 8.74653C10.623 6.31921 10.6115 5.03487 10.5026 4.44106C10.4907 4.37621 10.4777 4.31992 10.4645 4.27142C10.1684 4.33009 9.70398 4.55131 9.08664 5.18651ZM11.2029 3.09723L11.8891 2.05244L11.7624 1.96923L11.6195 1.91871C9.98554 1.34102 8.3982 2.30782 7.29384 3.44414C6.11755 4.65447 5.07902 6.43661 4.38988 8.49009C3.02832 12.4469 3.21132 15.4088 4.02481 17.5612C4.08858 17.7299 4.15588 17.8928 4.22613 18.0498C3.33593 18.8967 2.43613 19.5104 1.57178 19.8256L2.42827 22.1743C3.54636 21.7666 4.60958 21.0656 5.59562 20.1869C6.10788 20.7674 6.60902 21.1685 6.97368 21.4206L6.97688 21.4228C7.34507 21.6756 7.79536 21.7843 8.24179 21.7229C8.68768 21.6616 9.0901 21.4363 9.37611 21.0976L11.5982 18.4181L12.2452 20.4048C12.3375 20.6921 12.5045 20.9524 12.7324 21.1567C12.9624 21.3628 13.2454 21.5037 13.5523 21.5612C13.8596 21.6188 14.1761 21.59 14.4672 21.4788C14.758 21.3678 15.0104 21.1797 15.1998 20.9379L15.209 20.9261L16.9498 18.5896L17.5173 20.4432L17.5208 20.4545C17.6126 20.7444 17.7804 21.0072 18.01 21.213C18.24 21.4191 18.523 21.56 18.8299 21.6175C19.1372 21.6751 19.4537 21.6462 19.7448 21.5351C20.0356 21.424 20.288 21.236 20.4774 20.9941L20.4872 20.9816L23.0036 17.5931L20.9965 16.1026L19.4432 18.1942L18.8767 16.3438C18.7894 16.0479 18.6228 15.7783 18.391 15.5672C18.1551 15.3522 17.8615 15.2069 17.5431 15.1518C17.2243 15.0967 16.8973 15.1349 16.6008 15.2606C16.3126 15.3827 16.067 15.5813 15.8876 15.8309L14.1461 18.1683L13.528 16.2708C13.4401 15.9852 13.2778 15.7249 13.0543 15.5193C12.8239 15.3073 12.5381 15.1624 12.2276 15.1034C11.9169 15.0443 11.5961 15.0742 11.3017 15.1893C11.0196 15.2996 10.7753 15.4828 10.591 15.7162L7.89625 18.9658C7.72027 18.806 7.52855 18.6102 7.33578 18.3747C7.69445 17.9457 8.03806 17.4992 8.36509 17.0429C10.0189 14.7356 11.3717 12.0071 12.2009 9.53774L12.204 9.52848C13.0692 6.88392 13.1741 5.14821 12.9615 3.98983C12.8536 3.40202 12.6635 2.96213 12.4505 2.63929C12.3449 2.47931 12.2374 2.35369 12.1387 2.25679C12.0896 2.20854 12.0431 2.16793 12.0009 2.13408C11.9798 2.11717 11.9598 2.10199 11.9411 2.08841C11.9318 2.08163 11.9228 2.07525 11.9141 2.06926L11.9013 2.06056L11.8952 2.05643L11.8921 2.05442C11.8906 2.05342 11.8891 2.05244 11.2029 3.09723Z" fill="#6B758F" />
                    </svg>
                  </span>
                  <span>QR 리스트</span>
                </li>
              </Link>
              <li className="category">
                COMMUNITY 커뮤니티
              </li>
              <Link href={"/community/notice"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" fill="#E7ECEF" />
                      <path d="M16.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H16.5C16.7761 9 17 8.77614 17 8.5V7.5C17 7.22386 16.7761 7 16.5 7Z" fill="#737A83" />
                      <path d="M16.5 11H7.5C7.22386 11 7 11.2239 7 11.5V12.5C7 12.7761 7.22386 13 7.5 13H16.5C16.7761 13 17 12.7761 17 12.5V11.5C17 11.2239 16.7761 11 16.5 11Z" fill="#737A83" />
                      <path d="M16.5 15H7.5C7.22386 15 7 15.2239 7 15.5V16.5C7 16.7761 7.22386 17 7.5 17H16.5C16.7761 17 17 16.7761 17 16.5V15.5C17 15.2239 16.7761 15 16.5 15Z" fill="#737A83" />
                    </svg>
                  </span>
                  <span>
                    공지사항
                  </span>
                </li>
              </Link>
              <Link href={"/community/posts"} passHref>
                <li className="item">
                  <span className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" fill="#E7ECEF" />
                      <path d="M16.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H16.5C16.7761 9 17 8.77614 17 8.5V7.5C17 7.22386 16.7761 7 16.5 7Z" fill="#737A83" />
                      <path d="M16.5 11H7.5C7.22386 11 7 11.2239 7 11.5V12.5C7 12.7761 7.22386 13 7.5 13H16.5C16.7761 13 17 12.7761 17 12.5V11.5C17 11.2239 16.7761 11 16.5 11Z" fill="#737A83" />
                      <path d="M16.5 15H7.5C7.22386 15 7 15.2239 7 15.5V16.5C7 16.7761 7.22386 17 7.5 17H16.5C16.7761 17 17 16.7761 17 16.5V15.5C17 15.2239 16.7761 15 16.5 15Z" fill="#737A83" />
                    </svg>
                  </span>
                  <span>게시글 관리하기</span>
                </li>
              </Link>
            </ul>
          </Items>
        </div>
      </TabBody>
      <TabOffComponents className={tab.includes('on') ? "on" : "off"} onClick={() => update('tab-off')} />
    </>
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
  left: 0px;
  
  
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
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

  > a h1 {
    font-size: 24px;
    font-weight: 700;
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

  > ul {
    padding-left: 0px;
    list-style: none;

    margin-top: 0px;
    margin-bottom: 1rem;
    display: block;
  }

  > ul > a {
    text-decoration: none;
  }

  > ul > li.category {
    margin-top: 24px;
    color: rgb(42, 53, 71);
    font-size: 12px;
    font-weight: 700;
    line-height: 26px;
    text-transform: uppercase;
    padding: 3px 12px;
  }

  > ul > li.item {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  li.item {
    cursor: pointer;
    color: rgb(42, 53, 71);
    display: flex;
    font-size: 14px;
    white-space: nowrap;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    font-weight: 400;
    margin: 0px 0px 2px;
    padding: 10px;
    border-radius: 7px;
    gap: 15px;
    display: flex !important;
  }

  li.item:hover {
    background-color: rgba(93, 135, 255, 0.1);
    color: rgb(93, 135, 255);
  }

  li.item > span.icon {
    display: list-item;
    text-align: -webkit-match-parent;
  }
`

const TabOffComponents = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;

  z-index: 10;
  content: ' ';
  &.off {
    display: none;
  }

  &.on {
    display: block;
  }
`