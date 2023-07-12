import { TabType } from "@/utils/interfaces"
import Nav from "./Nav"
import Tab from "./Tab"
import { useState } from "react"

export default function Menu() {
  const [tab, setTab] = useState<TabType>("tab-on")
  return (
    <>
      <Nav update={setTab} />
      <Tab tab={tab} update={setTab} />
    </>
  )
}