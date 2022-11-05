import { useEffect } from "react";

const useAutoFocus = (show, item) => {

    useEffect(() => {
        (item.current && show) && item.current.focus()
    }, [show])
}


export default useAutoFocus;