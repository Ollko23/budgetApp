import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalSotrage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext()

export const UNCATEGORISED_BUDGET_ID = "Uncategorised"
export const TOTAL_BUDGET_ID = "Total"
export default function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalSotrage("budgets", [])
    const [expenses, setExpenses] = useLocalSotrage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return (expenses ? expenses.filter(expense => expense.budgetId === budgetId) : [])
    }
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORISED_BUDGET_ID }
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter((b) => b.id !== id)
        })
    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter((e) => e.id !== id)
        })
    }

    function handleClose(fn, items, fnId) {
        if (typeof arguments[1] === "function") {
            fnId = items
            items = []
        }
        fn(false)
        fnId && fnId()
        items.forEach(i => i.current.value = "")
    }
    // function handleKeys(handleClose, handleSubmit) {
    //     function listener(event) => {
    //         switch (event.key) {
    //             case "Escape":
    //                 console.log(handleClose)
    //                 handleClose()
    //                 break;
    //             case "Enter":
    //                 console.log(handleSubmit)
    //                 handleSubmit()
    //                 break;
    //             default:
    //                 return;
    //         }
    //     }
    // }

    // function listener(event) {
    //     switch (event.key) {
    //         case "Escape":
    //             console.log(event.key)
    //             handleClose()
    //             break;
    //         case "Enter":
    //             console.log(event.key)
    //             // b()
    //             break;
    //         default:
    //             return;
    //     }
    // }


    return (
        <BudgetContext.Provider value={{
            budgets,
            setBudgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
            handleClose
        }}>
            {children}
        </BudgetContext.Provider>
    )
}