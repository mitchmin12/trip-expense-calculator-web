import { createContext, useContext, useEffect, useReducer } from "react";

const TripContext = createContext();

const initialState = {
    trips: [],
    selectedTrip: null,
    isLoading: false,
    isEditing: false,
    error: "",
};

function reducer(state, action) {
    switch(action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true
            };
        case "tripsLoaded":
            return {
                ...state,
                trips: action.payload,
                isLoading: false
            }
        case "tripSelected":
            return {
                ...state,
                selectedTrip: action.payload,
                isEditing: false
            }
        case "tripDeleted":
            return {
                ...state,
                trips: state.trips.filter(trip => trip.id !== action.payload),
                selectedTrip: state.selectedTrip?.id === action.payload ? null : state.selectedTrip
            }
        case "tripAdded":
            return {
                ...state,
                trips: [...state.trips, action.payload]
            }
        case "tripUpdated":
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.id ? action.payload : trip),
                selectedTrip: action.payload,
                isEditing: false
            }
        case "tripClosed":
            return {
                ...state,
                selectedTrip: null,
                isEditing: false
            }
        case "editToggled":
            return {
                ...state,
                isEditing: !state.isEditing
            }

        case "error":
            return {
                ...state,
                error: action.payload
            }
        default:
            throw new Error("Unkown action")
    }
}

function TripProvider ({children}){
    const [{trips, selectedTrip, isLoading, isEditing}, dispatch] = useReducer(reducer, initialState);
    
    useEffect(function (){
        async function fetchTrips() {
            dispatch({type: "loading"})
            
            try {
                await fetch("https://localhost:7235/api/trips/")
                      .then(res => res.json())
                      .then(res => dispatch({type: "tripsLoaded", payload: res}));

                
            } catch (error) {
                dispatch({type: "error", payload: `Error loading trips - ${error.message}`})
            }
        }

        fetchTrips();
    }, [])

    function handleSelectTrip(id) {
        const newSelectedTrip = trips.find((trip) => trip.id === id);

        dispatch({type: "tripSelected", payload: newSelectedTrip})
    }

    async function handleDeleteTrip(id) {
        try {
            const request = `https://localhost:7235/api/trips/${id}`;

            await fetch(request, {
               method: "DELETE",
               headers: {
                "Content-Type": "application/json"
               }
            })
            .then(dispatch({type: "tripDeleted", payload: id}))
        }
        catch (error){
            dispatch({type: "error", payload: `Error deleting trip - ${error.message}`})
        }
    }

    async function handleAddTrip() {
        try {
            const request = "https://localhost:7235/api/trips/";

            const newTrip = {
                name: "New Trip",
            }

            await fetch(request, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTrip)
             })
             .then(res => res.json())
             .then(res => dispatch({type: "tripAdded", payload: res}))
        }
        catch (error) {
            dispatch({type: "error", payload: `Error adding trip - ${error.message}`})
        }
    }

    async function handleSaveTrip(updatedTrip) {
        try {
            const request = `https://localhost:7235/api/trips/${updatedTrip.id}`;
            

            fetch(request, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTrip)
            })
            .then(res => res.json())
            .then(res => dispatch({type: "tripUpdated", payload: res}))
        }
        catch (error) {
            dispatch({type: "error", payload: `Error updating trip - ${error.message}`})
        }
    }
    
    function handleCloseTrip() {
        dispatch({type: "tripClosed"})
    }

    function handleToggleEdit() {
        dispatch({type: "editToggled"})
    }

    const providerValue = {
        trips,
        selectedTrip,
        isLoading,
        isEditing,
        handleSelectTrip,
        handleDeleteTrip,
        handleAddTrip,
        handleCloseTrip,
        handleToggleEdit,
        handleSaveTrip
    }

    return <TripContext.Provider value = {providerValue}>
        {children}
    </TripContext.Provider>
}

function useTrips() {
    const context = useContext(TripContext);

    if(context === undefined) throw new Error ("Trip Context was used outside of it's provider");

    return context
}

export {TripProvider, useTrips}