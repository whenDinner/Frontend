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
    default:
      return {
        ...state
      }
  }
}
