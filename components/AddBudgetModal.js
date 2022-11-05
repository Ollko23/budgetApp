import "../modal.css"
import { useRef, useEffect } from "react"
import useBudgets from "../contexts/BudgetContext"
import useAutoFocus from "../hooks/useAutoFocus"
export default function AddBudgetModal({ show, close }) {

    const nameRef = useRef()
    const maxRef = useRef()
    const modalRef = useRef(null)

    const { addBudget, handleClose } = useBudgets()

    let modalState = show ? "" : "hide"

    useAutoFocus(show, nameRef)

    function handleSubmit(e) {
        e && e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max: parseInt(maxRef.current.value)
        })
        handleClose(close, [nameRef, maxRef])
    }

    function listener(event) {
        switch (event.key) {
            case "Escape":
                handleClose(close, [nameRef, maxRef])
                break;
            case "Enter":
                handleSubmit()
                break;
            default:
                return;
        }
    }
    useEffect(() => {
        if (show) {
            window.addEventListener("keydown", listener)
        }
        return () => window.removeEventListener("keydown", listener)

    }, [show])


    return (

        <div ref={modalRef} className={`bg ${modalState}`}>
            <div className="modal-box">
                <div className="top">
                    <h1>New Budget</h1>
                    <button onClick={() => handleClose(close, [nameRef, maxRef])}>X</button>
                </div>
                <div className="middle">
                    <form >
                        <label >Name</label>
                        <input ref={nameRef} type="text" />
                        <label >Maximum Spending</label>
                        <input ref={maxRef} type="number" ></input>
                    </form>
                </div>
                <div className="bottom">
                    <button onClick={handleSubmit} type="submit">Add</button>
                </div>
            </div>
        </div>

    )
}
