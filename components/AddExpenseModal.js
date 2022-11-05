import "../modal.css"
import { useRef, useEffect } from "react"
import useBudgets, { UNCATEGORISED_BUDGET_ID } from "../contexts/BudgetContext"
import useAutoFocus from "../hooks/useAutoFocus"

export default function AddExpenseModal({ show, defaultBudgetId, close, setdefaultBudgetId }) {

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef(null)

    const { addExpense, budgets, handleClose } = useBudgets()

    let modalState = show ? "" : "hide"

    useAutoFocus(show, descriptionRef)

    function handleSubmit(e) {
        e && e.preventDefault()
        addExpense({
            amount: parseInt(amountRef.current.value),
            description: descriptionRef.current.value,
            budgetId: budgetIdRef.current.value
        })
        handleClose(close, [descriptionRef, amountRef])
        setdefaultBudgetId(UNCATEGORISED_BUDGET_ID)
        console.log(defaultBudgetId)

    }
    function listener(event) {
        switch (event.key) {
            case "Escape":
                handleClose(close, [descriptionRef, amountRef])
                setdefaultBudgetId(UNCATEGORISED_BUDGET_ID)
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

        <div className={`bg ${modalState}`}>
            <div className="modal-box">
                <div className="top">
                    <h1>New Expense</h1>
                    <button onClick={() => handleClose(close, [descriptionRef, amountRef])}>X</button>
                </div>
                <div className="middle">
                    <form >
                        <label for="description">Description</label>
                        <input ref={descriptionRef} type="text"></input>
                        <label for="amount">Amount</label>
                        <input ref={amountRef} type="number"></input>
                        <label for="budgetId">Budget</label>
                        <select ref={budgetIdRef} value={defaultBudgetId}>
                            <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
                            {
                                budgets.map(budget =>
                                    (<option key={budget.id} value={budget.id}>{budget.name}</option>))
                            }
                        </select>
                    </form>
                </div>
                <div className="bottom">
                    <button onClick={handleSubmit} type="submit">Add</button>
                </div>
            </div>
        </div>

    )
}
