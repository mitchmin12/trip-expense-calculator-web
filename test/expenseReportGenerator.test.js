import { expect, test } from "vitest";
import expenseReportGenerator from '../src/helpers/expenseReportGenerator';

test("expenseReportGenerator.generate()", () => {
    const travelersToTest = [
        {
            name: "Louis",
            expenses: [
                {
                    name: "Expense 1",
                    cost: 5.75
                },
                {
                    name: "Expense 2",
                    cost: 35.00
                },
                {
                    name: "Expense 3",
                    cost: 12.79
                }
            ]
        },
        {
            name: "Carter",
            expenses: [
                {
                    name: "Expense 1",
                    cost: 12.00
                },
                {
                    name: "Expense 2",
                    cost: 15.00
                },
                {
                    name: "Expense 3",
                    cost: 23.23
                }
            ]
        },
        {
            name: "David",
            expenses: [
                {
                    name: "Expense 1",
                    cost: 10.00
                },
                {
                    name: "Expense 2",
                    cost: 20.00
                },
                {
                    name: "Expense 3",
                    cost: 38.41
                },
                {
                    name: "Expense 4",
                    cost: 45.00
                },
            ]
        }
    ]

    const results = expenseReportGenerator.generate(travelersToTest);

    expect(results.fairShare).toBe("$72.39");
    
    expect(results.travelers.length).toBe(3);

    expect(results.travelers.at(0).name).toBe("Carter");
    expect(results.travelers.at(1).name).toBe("Louis");
    expect(results.travelers.at(2).name).toBe("David");

    const carter = results.travelers.at(0)
    const louis = results.travelers.at(1)
    const david = results.travelers.at(2)

    expect(carter.peopleOwed.length).toBe(1);
    expect(louis.peopleOwed.length).toBe(1);
    expect(david.peopleOwed.length).toBe(0);

    expect(carter.peopleOwed.at(0).name).toBe("David")
    expect(carter.peopleOwed.at(0).amount).toBe("$22.16")

    expect(louis.peopleOwed.at(0).name).toBe("David")
    expect(louis.peopleOwed.at(0).amount).toBe("$18.85")
})