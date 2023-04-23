interface windowSize {
  width: number,
  height: number
}

export interface GlobalProps {
  size: windowSize
}

export type GlobalAction =
  | { type: "reSizeEvent", width: number, height: number }

export interface ItemComponentsProps {
  imagePath: string,
  href: string,
  title: string,
  size: windowSize
}

export interface ErrorComponentsProps { 
  title: string, 
  desc: string 
}
