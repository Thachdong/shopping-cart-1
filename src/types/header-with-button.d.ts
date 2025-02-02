import { ReactNode } from "react"

type THeaderWithButton = THeader & {
    button: ReactNode,
    className?: string,
}