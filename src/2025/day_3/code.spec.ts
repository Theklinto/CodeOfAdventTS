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
    const data = [
        "5711377113466675766354253665637477467166252166726612166663276146746564737732416111157574562175133489",
    ];
    const result = getTotalJoltage(data);
    expect(result).toBe(89);
});

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

test("Example2", () => {
    expect(getTotalJoltageExtended(["987654321111111"])).toBe(987654321111);
    expect(getTotalJoltageExtended(["811111111111119"])).toBe(811111111119);
    expect(getTotalJoltageExtended(["234234234234278"])).toBe(434234234278);
    expect(getTotalJoltageExtended(["818181911112111"])).toBe(888911112111);
});

test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"));
    const result = getTotalJoltageExtended(data);
    expect(result).toBe(172119830406258);
});
function getTotalJoltageExtended(batteryBanks: string[]): number {
    let totalJoltage = 0;
    for (const bank of batteryBanks) {
        const batteries = bank
            .split("")
            .map((x) => +x)
            .reverse();
        let selectedBatteries: number[] = [];
        for (const battery of batteries) {
            //Fill initial batteries
            if (selectedBatteries.length < 12) {
                selectedBatteries.unshift(battery);
                continue;
            }

            //Candidate for shifting
            const shiftBatteries = (selectedBatteries[0] ?? 0) <= battery;
            if (!shiftBatteries) continue;

            selectedBatteries.unshift(battery);
            let batteryToRemoveIndex: number | undefined;
            for (let i = 1; i < selectedBatteries.length; i++) {
                const currentBattery = selectedBatteries[i];
                batteryToRemoveIndex ??= i;
                const batteryToRemove = selectedBatteries[batteryToRemoveIndex];
                if (batteryToRemove < currentBattery) break;
                batteryToRemoveIndex = i;
            }
            if (batteryToRemoveIndex) {
                selectedBatteries.splice(batteryToRemoveIndex, 1);
            }
        }

        const joltage = +selectedBatteries.join("");
        totalJoltage += joltage;
    }

    return totalJoltage;
}
