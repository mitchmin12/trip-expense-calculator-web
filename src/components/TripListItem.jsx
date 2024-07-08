import { useTrips } from '../contexts/TripContext';
import styles from './TripListItem.module.css'
import Button from "./ui/Button"

function TripListItem({trip}) {
    const {handleSelectTrip, handleCloseTrip, selectedTrip, isEditing, handleDeleteTrip} = useTrips();

    const isSelectedTrip = selectedTrip===trip;

    //I wanted to refactor the buttons so that there doesn't need to be 2 and there could just
    //be one using the same function, but time.
    return <div className={styles.tripListItem}>
        <div className={`${styles.text} ${isSelectedTrip && styles.isSelectedTrip}`}>{trip.name}</div>
        <div className={styles.buttonGroup}>
            <Button variant="outline" size="small" onClick={() => handleDeleteTrip(trip.id)} isDisabled={isEditing}>Delete</Button>
            {isSelectedTrip ? <Button variant="fill" size="small" onClick={() => handleCloseTrip(trip.id)} isDisabled={isEditing}>
                Close
            </Button> : <Button variant="fill" size="small" onClick={() => handleSelectTrip(trip.id)} isDisabled={isEditing}>
                Open
            </Button>}
        </div>
    </div>
}

export default TripListItem
