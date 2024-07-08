import { useTrips } from '../contexts/TripContext';
import expenseReportGenerator from '../helpers/expenseReportGenerator';
import styles from './ExpenseReport.module.css'
import Button from './ui/Button';

function ExpenseReport({isExpanded, onToggleExpand}) {
    const {selectedTrip} = useTrips();

    const report = expenseReportGenerator.generate(selectedTrip.travelers);
    const isSomethingToShow = selectedTrip.travelers.some(trav => trav.expenses.length > 0);

    return <div className={styles.expenseReport}>
        <div className={styles.header}>
            {isSomethingToShow ? <>
                <h3>Everyone's fair share is {report.fairShare}</h3>
                <Button variant="fill" size="small" onClick={onToggleExpand}>{isExpanded ? "Close Report" : "View Report"}</Button>
            </> : <>
                <h3>Add some travelers and expenses to view the report</h3>
            </>}
        </div>
        
        {isExpanded ? <div>
            {report.travelers.map(traveler => <div key={traveler.id}>
                {traveler.name}
                <ul>
                    {traveler.peopleOwed.length === 0 ? <li>Doesn't owe anything</li> :
                        traveler.peopleOwed?.map(personOwed => <li key={personOwed.id}>Owes {personOwed.name} {personOwed.amount}</li>)
                    }
                </ul>
            </div>)}
        </div> : ""}

    </div>
}

export default ExpenseReport
