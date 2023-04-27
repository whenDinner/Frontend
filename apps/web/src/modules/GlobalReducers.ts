import { GlobalAction, GlobalPropsState } from "@/utils/interface"

export default function GlobalReducers(state: GlobalPropsState, event: GlobalAction) {
  switch(event.type) {
    case "reSizeEvent":
      return {
        ...state,
        size: {
          width: event.width,
          height: event.height
        },
      }
    case "getUser":
      return {
        ...state,
        user: event.data
      }
    case "tab":
      return {
        ...state,
        tab: event.tab
      }
    default:
      return {
        ...state
      }
  }
}
