import {useState} from "react";
type confirmFunctionType = () => void | Promise<void>;

export const useConfirmWindow = () => {
    const [isConfirmWindowOpen,setIsConfirmWindowOpen] = useState(false)
    const [confirmFunction, setConfirmFunction] = useState<confirmFunctionType | undefined>(undefined)
    const [title, setTitle] = useState<string>('')
    console.log(confirmFunction)
    const openConfirmWindow = (someFunction: () => Promise<void>, head: string) => {
        setIsConfirmWindowOpen(true)
        setTitle(head)
        setConfirmFunction(() => someFunction)
    }

    return {isConfirmWindowOpen, openConfirmWindow, confirmFunction, title}
}