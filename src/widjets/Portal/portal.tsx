import {createPortal} from "react-dom";
import {ReactNode} from "react";

export interface PortalProps {
    children: ReactNode;
    element?: HTMLElement
}
export const Portal = (props: PortalProps) => {

    const {
        element = document.body,
        children
    } = props

    return createPortal(children, element)
}