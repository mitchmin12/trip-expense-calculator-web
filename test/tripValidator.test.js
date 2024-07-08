import { expect, test } from "vitest"
import tripValidator from "../src/helpers/tripValidator"

test("tripValidator.validate()", () => {
    const travelersToTest = [
        {
            name: "",
            expenses: [
                {
                    name: "",
                    cost: ""
                },
                {
                    name: "Valid Name",
                    cost: "Random string instead of a number"
                }
            ]
        }
    ];

    const results = tripValidator.validate("", travelersToTest)

    expect(results.length).toBe(5);
    expect(results.at(0)).toBe("The Trip is missing its name");
    expect(results.at(1)).toBe("A Traveler is missing their name");
    expect(results.at(2)).toBe("An Expense is missing its name");
    expect(results.at(3)).toBe("An Expense is missing its cost");
    expect(results.at(4)).toBe("An Expense is not a number");
})

test("tripValidator.validate() With Valid Trip", () => {
    const travelersToTest = [
        {
            name: "David",
            expenses: [
                {
                    name: "A valid Name",
                    cost: 5.00
                },
                {
                    name: "Another valid Name",
                    cost: "6.00"
                }
            ]
        }
    ];

    const results = tripValidator.validate("A valid Trip Name", travelersToTest)

    expect(results.length).toBe(0);
})