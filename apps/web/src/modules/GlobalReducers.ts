import { GlobalAction, GlobalProps } from "@/utils/interface"

export default function GlobalReducers(state: GlobalProps, event: GlobalAction) {
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
        boolean: event.boolean
      }
    default:
      return {
        ...state
      }
  }
}
