import "../modal.css"
import { useRef, useEffect } from "react"
import useBudgets, { UNCATEGORISED_BUDGET_ID, TOTAL_BUDGET_ID } from "../contexts/BudgetContext"
import { currencyFormater } from "../utils"

export default function ViewExpensesModal({ close, show, budgetId, id }) {

    const modalRef = useRef(null)

    const { getBudgetExpenses, budgets, deleteExpense, deleteBudget, handleClose, expenses } = useBudgets()
    const expensesFiltered = budgetId === TOTAL_BUDGET_ID ? expenses : getBudgetExpenses(budgetId)
    let modalState = show ? "" : "hide"
    const budget = UNCATEGORISED_BUDGET_ID === budgetId ? { name: "Uncategorised", id: UNCATEGORISED_BUDGET_ID }
        : TOTAL_BUDGET_ID === budgetId ? { name: "Total", id: TOTAL_BUDGET_ID }
            : budgets.find(b => b.id === budgetId)

    function listener(event) { event.key === "Escape" && handleClose(close, id) }

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
                    <div className="del-budg-btn">
                        <h1>Expenses - {budget?.name}</h1>
                        <button className="btn-primary" onClick={() => {
                            deleteBudget(budget);
                            handleClose(close, id)

                        }}>X</button>
                    </div>
                    <button onClick={() => handleClose(close, id)}>X</button>
                </div>
                <div className="middle">
                    {expensesFiltered.map(e => (
                        <div className="row" key={e.id}>
                            <span>{e.description}</span>
                            <div >
                                <span>{currencyFormater.format(e.amount)}</span>
                                <button onClick={() => { deleteExpense(e); console.log(e) }}>&times;</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bottom">

                </div>
            </div>
        </div >

    )
}
