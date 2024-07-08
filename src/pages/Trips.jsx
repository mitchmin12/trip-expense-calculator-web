import styles from './Trips.module.css'
import TripList from "../components/TripList"
import SelectedTrip from '../components/SelectedTrip'
import { useTrips } from '../contexts/TripContext';

function Trips() {
    const { isLoading } = useTrips();

    return <div className={styles.trips}>
        { isLoading ? <h1>Loading...</h1> : <>
            <TripList />
            <SelectedTrip />
        </>}
    </div>
}

export default Trips
