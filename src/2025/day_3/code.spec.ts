import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("example1", () => {
    const data = ["987654321111111", "811111111111119", "234234234234278", "818181911112111"];
    const result = getTotalJoltage(data);
    expect(result).toBe(357);
});

//Lower than 17381;
test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"));
    const result = getTotalJoltage(data);
    expect(result).toBe(17376);
});
test("EdgeCases", () => {
    const data = ["5711377113466675766354253665637477467166252166726612166663276146746564737732416111157574562175133489"];
    const result = getTotalJoltage(data);
    expect(result).toBe(89);
})

function getTotalJoltage(batteryBanks: string[]): number {
    let totalJoltage = 0;
    for (const bank of batteryBanks) {
        const batteries = bank.split("").map((x) => +x);
        const largestBattery = batteries
            .slice(0, -1)
            .reduce((prev, curr) => (prev > curr ? prev : curr), 0);
        const largestBatteryIndex = batteries.indexOf(largestBattery);
        const secondaryBatteryJoltage = batteries
            .slice(largestBatteryIndex + 1)
            .reduce((prev, curr) => (prev > curr ? prev : curr));

        const bankJoltage = +`${batteries[largestBatteryIndex]}${secondaryBatteryJoltage}`;
        totalJoltage += bankJoltage;
    }

    return totalJoltage;
}
