import React from 'react'
import useBudgets, { UNCATEGORISED_BUDGET_ID } from '../contexts/BudgetContext'
import BudgetCard from './BudgetCard'

export default function UncatefgorisedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)

    if (amount === 0) return null
    return (
        <BudgetCard amount={amount} name="Uncategorised" {...props} />
    )
}
