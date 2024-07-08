import { useState } from 'react'
import styles from './TravelerForm.module.css'
import ExpenseForm from './ExpenseForm';
import Button from './ui/Button';
import FormTextInput from './ui/FormTextInput';

function TravelerForm({traveler, onDeleteTraveler, onUpdateTraveler}) {
    const [travelerName, setTravelerName] = useState(traveler.name)
    const [expenses, setExpenses] = useState(traveler.expenses)


    function handleTravelerNameChange(newName) {
        setTravelerName(newName);
        onUpdateTraveler({...traveler, name: newName})
    }

    function handleAddExpense() {
        const newExpense = {name: "New Expense", id: crypto.randomUUID(), cost: 0}
        const newExpenses = [...expenses, newExpense]
        
        setExpenses(newExpenses)
        onUpdateTraveler({...traveler, expenses: newExpenses})
    }

    function handleDeleteExpense(id) {
        const newExpenses = expenses.filter(expense => expense.id !== id);

        setExpenses(newExpenses);
        onUpdateTraveler({...traveler, expenses: newExpenses})
    }

    function handleUpdateExpense(updatedExpense) {
        const newExpenses = expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp)

        setExpenses(newExpenses);
        onUpdateTraveler({...traveler, expenses: newExpenses})
    }

    
    return <div className={styles.travelerFormContainer}>
        <div className={styles.travelerForm}>
            <FormTextInput label="Traveler Name" value={travelerName} onChange={(e) => handleTravelerNameChange(e.target.value)}/>
            
            <Button variant="fill" size="small" onClick={handleAddExpense}>Add Expense</Button>
            <Button variant="fill" size="small" onClick={() => onDeleteTraveler(traveler.id)}>Delete Traveler</Button>
        </div>
        
        {expenses.map(expense => <ExpenseForm expense={expense} onDeleteExpense={handleDeleteExpense} key={expense.id} onUpdateExpense={handleUpdateExpense}/>)}
    </div>
}



export default TravelerForm
