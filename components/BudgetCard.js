import React, { useState, useEffect, useRef } from 'react'
import { currencyFormater } from '../utils'
import "../App.css"
import useBudgets from '../contexts/BudgetContext'

export default function BudgetCard({ name, amount, max, onAddExpenseClick, onViewExpensesClick, budgetId, hideViewExpenseBtn, hideAddExpenseBtn }) {

    const maxRef = useRef()
    const gaugeRef = useRef()
    const classNames = []
    const [progress, setProgress] = useState(0)
    const { setBudgets } = useBudgets()
    const field = document.createElement("input")
    field.setAttribute("type", "number")

    useEffect(() => {
        setProgress(Math.round(amount / max * 100))
    }, [amount, max])

    function setNewMax(e, value, element) {
        if (e.key === "Enter") {
            let newMax = parseInt(value)
            field.classList.add("hide")
            element.classList.remove("hide")
            setBudgets(prevBudgets => {
                return prevBudgets.map(budget => {
                    if (budget.id !== budgetId) return budget
                    return { ...budget, max: newMax }
                })
            })
            return window.removeEventListener("keydown", (e) => {
                setNewMax(e, field.value, element)
            })
        }
    }

    function changeMax(t) {
        let element = t.target
        let elementParent = element.parentElement

        element.classList.add("hide")
        elementParent.appendChild(field).focus()


        window.addEventListener("keydown", (e) => {
            setNewMax(e, field.value, element)
        });
    }

    function gauge() {
        let percentage = amount / max
        if (percentage > 0.5 && percentage < 0.75) { classNames.splice(0, classNames.length, "yellow") }
        else if (percentage > 0.75 && percentage < .9) { classNames.push(0, classNames.length, "orange") }
        else if (percentage > 0.90) { classNames.push(0, classNames.length, "red") }
        else { classNames.push(0, classNames.length, "blue") }
        return classNames.join(" ")
    }

    return (
        <>
            <div className='card'>
                <div className='top'>
                    <div className='title'>{name}</div>
                    <div className='amount'>{`${currencyFormater.format(amount)}/`}<span ref={maxRef} onClick={(e) => { changeMax(e) }}>{max && `${currencyFormater.format(max)}`}</span></div>

                </div>
                <div className='middle'>
                    {max && (
                        <div className='gauge' ></div>)}
                    {max && (
                        <div ref={gaugeRef} className={`gaugeProgress ${gauge()}`} style={{ width: `${progress}%` }}>
                            <p>{`${progress}%`}</p>
                        </div>)}
                </div>
                {(!hideAddExpenseBtn || !hideViewExpenseBtn) && <div className='bottom'>
                    {!hideAddExpenseBtn && <button className='btn-secondary' onClick={onAddExpenseClick}>Add Expense</button>}
                    {!hideViewExpenseBtn && <button className='btn-grey' onClick={onViewExpensesClick}>View Expense</button>}
                </div>}
            </div>
        </>
    )
}
