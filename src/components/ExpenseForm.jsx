import { useState } from 'react'
import styles from './ExpenseForm.module.css'
import Button from './ui/Button';
import FormTextInput from './ui/FormTextInput';

function ExpenseForm({expense, onDeleteExpense, onUpdateExpense}) {
    const [expenseName, setExpenseName] = useState(expense.name)
    const [expenseCost, setExpenseCost] = useState(expense.cost)
    
    function handleExpenseNameChange(newName){
        setExpenseName(newName);

        onUpdateExpense({...expense, name: newName})
    }

    function handleExpenseCostChange(newCost){
        setExpenseCost(newCost);

        onUpdateExpense({...expense, cost: newCost})
    }

    return <div className={styles.expenseForm}>
        <FormTextInput label="Expense Name" value={expenseName} onChange={(e) => handleExpenseNameChange(e.target.value)}/>
        <FormTextInput label="Expense Cost" value={expenseCost} onChange={(e) => handleExpenseCostChange(e.target.value)}/>

        <Button variant="fill" size="small" onClick={() => onDeleteExpense(expense.id)}>Delete Expense</Button>
    </div>
}

export default ExpenseForm
