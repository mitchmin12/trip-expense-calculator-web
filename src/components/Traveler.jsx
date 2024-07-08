import currencyFormatter from '../helpers/currencyFormatter';
import styles from './Traveler.module.css'

function Traveler({traveler}) {
    const totalExpenses = traveler.expenses?.reduce((acc, expense) => acc + expense.cost, 0);

    return <div>
        <div className={styles.traveler}>{traveler.name} - Total Expenses: {currencyFormatter.formatAsUSD(totalExpenses)}</div>
        <ul>
            {traveler.expenses.map(expense => <li className={styles.expense} key={expense.id}>
                {expense.name} {currencyFormatter.formatAsUSD(expense.cost)}
            </li>)}
        </ul>
    </div>
}

export default Traveler
