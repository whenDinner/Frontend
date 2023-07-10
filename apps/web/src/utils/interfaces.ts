import { Dispatch, SetStateAction } from "react"

export type TabType = "tab-normal" | "tab-on" | "tab-off"

export interface TabProps {
  tab: TabType,
  update: Dispatch<SetStateAction<TabType>>
}

export interface User {
  uuid: string,
  type: number,
  student_id: string,
  login: string,
  nickname: string,
  roomNumber: number,
  number: number,
  isReturn: number,
  isOuting: boolean,
  grade: number,
  class: number,
  gender: "M" | "F",
  fullname: string,
  createdAt: string,
}

export type UserDataResponse = {
  success: boolean,
  user: User[]
}

export interface QuickResponse {
  uuid: string,
  name: string,
  action: "OUTGO" | "WRTIE" | "PLACE",
  createAt: string
}