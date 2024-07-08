const tripValidator ={
    validate(tripName, travelers){
        let errors = [];

        if(tripName.length === 0){
            errors.push("The Trip is missing its name");
        }

        if(travelers.some(trav => trav.name.length === 0)){
            errors.push("A Traveler is missing their name");
        }

        if(travelers.some(trav => trav.expenses.some(expense => expense.name.length === 0))){
            errors.push("An Expense is missing its name");
        }

        if(travelers.some(trav => trav.expenses.some(expense => expense.cost.length === 0))){
            errors.push("An Expense is missing its cost");
        }

        if(travelers.some(trav => trav.expenses.some(expense => expense.cost.length !== 0 && isNaN(expense.cost)))){
            errors.push("An Expense is not a number");
        }

        return errors;
    }
}

export default tripValidator;