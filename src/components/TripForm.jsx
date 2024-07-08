import { useEffect, useState } from 'react'
import styles from './TripForm.module.css'
import TravelerForm from './TravelerForm';
import Button from './ui/Button';
import FormTextInput from './ui/FormTextInput';
import tripValidator from '../helpers/tripValidator';
import { useTrips } from '../contexts/TripContext';

function TripForm() {
    const {selectedTrip, handleSaveTrip, handleToggleEdit} = useTrips();

    //Since this is a form that can be different than the backing domain object,
    //we will copy all the trip values into their own state variables that can change independently.
    //Once the trip is actually submitted, we will then make the required API call to update the trip.

    const [tripName, setTripName] = useState(selectedTrip.name);
    const [travelers, setTravelers] = useState(selectedTrip.travelers);
    const [errors, setErrors] = useState([]);

    //because of all the lifted state/handlers, it makes sense to refactor this into a context.
    //But I didn't know that when I set out building this, and I ran out of time to
    //properly refactor this.
    //Additionally how the SelectedTrip component determines if the TripForm component is displayed
    //should also be refacted and that's probably the level where the context should live. Changing
    //how that was displayed was on my todo list but once again, just ran out of time.
    useEffect(function () {
        const newErrors = tripValidator.validate(tripName, travelers);

        setErrors(newErrors);
    }, [tripName, travelers])

    function handleAddTraveler() {
        const newTraveler = {name: "New Traveler", id:crypto.randomUUID(), expenses: []}

        setTravelers([...travelers, newTraveler])
    }

    function handleDeleteTraveler(id) {
        setTravelers(travelers.filter(traveler => traveler.id !== id));
    }

    function handleUpdateTraveler(traveler) {
        setTravelers(travelers.map(trav => trav.id === traveler.id ? traveler : trav))
    }
    
    //I wanted this to be named "handleSaveTrip", but that name was already taken
    //And it was just easier to rename this, ideally something would be renamed
    //but I didn't have time to decide which.
    function onSaveTrip() {
        const tripToUpdate = {id: selectedTrip.id, name: tripName, travelers}

        handleSaveTrip(tripToUpdate);
    }

    return <div className={styles.formContainer}>
        <div className={styles.header}>
            <h2>Editing "{tripName}"</h2>
            <Button variant="outline" size="small" onClick={handleToggleEdit} >Cancel</Button>
            <Button variant="fill" isDisabled={errors.length > 0} size="small" onClick={onSaveTrip}>Save</Button>
        </div>
        
        {errors.length > 0 && <div className={styles.errors}>
            <p style={{color: "var(--color-primary-text)"}}>
                P.S. This is terrible UI/UX, but I didn't have time to implement validation that would flag the specific field that has an error.
                So we get this jumpy thing instead sadly.
            </p>
            <p>Errors!</p>
            {errors.map(error => <p key={error}>{error}</p>)}
        </div>}
        
        <div className={styles.tripForm}>

            <FormTextInput label="Trip Name" value={tripName} onChange={(e => setTripName(e.target.value))} />

            <Button variant="fill" size="small" onClick={handleAddTraveler}>Add Traveler</Button>
        </div>
        
        {travelers.map((traveler) => <TravelerForm traveler={traveler} onDeleteTraveler={handleDeleteTraveler} key={traveler.id} onUpdateTraveler={handleUpdateTraveler}/>)}
    </div>
}

export default TripForm
