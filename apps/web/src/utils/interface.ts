import { Dispatch } from "react"

interface WindowSize {
  width: number,
  height: number
}

interface UserData {
  class: number
  exp: number
  fullname: string
  gender: "M" | "F"
  grade: number
  iat: number
  login: string
  nickname: string
  number: number
  roomNumber: string
  student_id: string
  type: 0 | 1 | 2 | 3
} 

export interface GlobalProps {
  size: WindowSize,
  user?: UserData,
  tab?: boolean,
  update?: Dispatch<GlobalAction>
}

export type GlobalAction =
  | { type: "reSizeEvent", width: number, height: number }
  | { type: "getUser", data: UserData }
  | { type: "tab", boolean: boolean }

export interface ItemComponentsProps {
  imagePath: string,
  href: string,
  title: string,
  size: WindowSize
}

export interface ErrorComponentsProps { 
  title: string, 
  desc: string 
}
