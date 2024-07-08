import { expect, test } from "vitest"
import currencyFormatter from "../src/helpers/currencyFormatter"

test("currencyFormatter.formatAsUSD()", () => {
    expect(currencyFormatter.formatAsUSD(2)).toBe("$2.00")
})