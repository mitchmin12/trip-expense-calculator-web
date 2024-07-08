import TripListItem from "./TripListItem";
import styles from './TripList.module.css'
import Button from "./ui/Button";
import { useTrips } from "../contexts/TripContext";

function Trips() {
    const { handleAddTrip, isEditing, trips } = useTrips();

    return <div className={styles.tripList}>
        <div className={styles.header}>
            <h2>Trips</h2>
            <Button variant="fill" size="small" onClick={handleAddTrip} isDisabled={isEditing}>Add</Button>
        </div>
        {trips.map(trip => <TripListItem trip={trip} key={trip.id} />)}
    </div>
}

export default Trips
