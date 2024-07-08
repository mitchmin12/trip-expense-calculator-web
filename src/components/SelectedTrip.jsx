import styles from './SelectedTrip.module.css'
import Button from './ui/Button'
import Traveler from './Traveler';
import ExpenseReport from './ExpenseReport';
import TripForm from './TripForm';
import { useState } from 'react';
import { useTrips } from '../contexts/TripContext';

function SelectedTrip() {
    const { isEditing, selectedTrip, handleToggleEdit, handleCloseTrip } = useTrips();
    const [isExpenseReportExpanded, setIsExpenseReportExpanded] = useState(false);


    return <div className={styles.selectedTrip}>
        {isEditing && selectedTrip !== null ? <TripForm /> : <>
        <div className={styles.header}>
            {selectedTrip === null ? <h2>Please select a trip to get started</h2> : <>
                <h2>{selectedTrip.name}</h2>
                <Button variant="outline" size="small" onClick={handleCloseTrip}>Close</Button>
                <Button variant="fill" size="small" onClick={handleToggleEdit}>Edit</Button>
            </>}
        </div>
        
        {selectedTrip && <ExpenseReport isExpanded={isExpenseReportExpanded} onToggleExpand={() => setIsExpenseReportExpanded(!isExpenseReportExpanded)}></ExpenseReport>}

        {selectedTrip && <div className={styles.contentArea}>
            <div className={styles.travelersList}>
                {selectedTrip.travelers.map(traveler => <Traveler traveler={traveler} key={traveler.id}>
                </Traveler>)}
            </div>

        </div>}
        </>}
    </div>
}

export default SelectedTrip