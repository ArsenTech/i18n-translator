import { useState } from "react"

export function usePopupOpen({
     open,
     setOpen
}: {
     open?: boolean,
     setOpen?: (open: boolean) => void,
} = {}){
     const [internalOpen, setInternalOpen] = useState(false)
     const isControlled = open !== undefined
     const actualOpen = isControlled ? open : internalOpen
     const setActualOpen = isControlled ? setOpen! : setInternalOpen
     return {
          actualOpen,
          setActualOpen
     }
}