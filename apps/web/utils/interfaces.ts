import { Dispatch, SetStateAction } from "react"

export type TabType = "tab-normal" | "tab-on" | "tab-off"

export interface TabProps {
  tab: TabType,
  update: Dispatch<SetStateAction<TabType>>
}
