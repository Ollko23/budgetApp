import { useState } from "react";
import "./App.css"
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard"
import useBudgets, { UNCATEGORISED_BUDGET_ID, TOTAL_BUDGET_ID } from "./contexts/BudgetContext";
import UncatefgorisedBudgetCard from "./components/UncatefgorisedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard"
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false)
  const [viewExpensesModalId, setViewExpensesModalId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(UNCATEGORISED_BUDGET_ID)
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    if (!budgetId) {
      setAddExpenseModalBudgetId(UNCATEGORISED_BUDGET_ID)
    }
    setAddExpenseModalBudgetId(budgetId)

  }
  return (
    <>
      <h1 className="me-auto" >Budget</h1>
      <button onClick={() => setShowAddBudgetModal(true)}>Add Budget</button>
      <button onClick={() => openAddExpenseModal()}>Add Expense</button>
      <div className="budgetCards">
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
          return (<BudgetCard
            key={budget.id}
            budgetId={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => { setViewExpensesModalId(budget.id); setShowViewExpenseModal(true) }}
          />)
        }
        )}
        <UncatefgorisedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpensesClick={() => {
            setViewExpensesModalId(UNCATEGORISED_BUDGET_ID)
            setShowViewExpenseModal(true)
          }} />
        <TotalBudgetCard
          onViewExpensesClick={() => {
            setViewExpensesModalId(TOTAL_BUDGET_ID)
            setShowViewExpenseModal(true)
          }} />
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        close={setShowAddBudgetModal}
      />
      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        setdefaultBudgetId={setAddExpenseModalBudgetId}
        show={showAddExpenseModal}
        close={setShowAddExpenseModal}
      />
      <ViewExpensesModal
        onViewExpensesClick={() => setShowViewExpenseModal(true)}
        show={showViewExpenseModal}
        budgetId={viewExpensesModalId}
        defaultBudgetId={addExpenseModalBudgetId}
        id={setViewExpensesModalId}
        close={setShowViewExpenseModal}
      />
    </>
  );
}

export default App;
