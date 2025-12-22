import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("example1", () => {
    const data = ["987654321111111", "811111111111119", "234234234234278", "818181911112111"];
    const result = getTotalJoltage(data, 2);
    expect(result).toBe(357);
});

//Lower than 17381;
test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"));
    const result = getTotalJoltage(data, 2);
    expect(result).toBe(17376);
});
test("EdgeCases", () => {
    const data = [
        "5711377113466675766354253665637477467166252166726612166663276146746564737732416111157574562175133489",
    ];
    const result = getTotalJoltage(data, 2);
    expect(result).toBe(89);
});

test("Example2", () => {
    expect(getTotalJoltage(["987654321111111"], 12)).toBe(987654321111);
    expect(getTotalJoltage(["811111111111119"], 12)).toBe(811111111119);
    expect(getTotalJoltage(["234234234234278"], 12)).toBe(434234234278);
    expect(getTotalJoltage(["818181911112111"], 12)).toBe(888911112111);
});

test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"));
    const result = getTotalJoltage(data, 12);
    expect(result).toBe(172119830406258);
});
function getTotalJoltage(batteryBanks: string[], allowedBatteries: number): number {
    let totalJoltage = 0;
    for (const bank of batteryBanks) {
        const batteries = bank
            .split("")
            .map((x) => +x)
            .reverse();
        let selectedBatteries: number[] = [];
        for (const battery of batteries) {
            //Fill initial batteries
            if (selectedBatteries.length < allowedBatteries) {
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
