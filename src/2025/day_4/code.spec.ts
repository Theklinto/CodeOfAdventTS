import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Eample1", () => {
    const data = [
        "..@@.@@@@.",
        "@@@.@.@.@@",
        "@@@@@.@.@@",
        "@.@@@@..@.",
        "@@.@@@@.@@",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "@.@@@.@@@@",
        ".@@@@@@@@.",
        "@.@.@@@.@.",
    ];
    const result = getAccessibleRolls(data);
    expect(result).toBe(13);
});
test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getAccessibleRolls(data);
    expect(result).toBe(1393);
});
function getAccessibleRolls(input: string[]): number {
    let accessibleRolls = 0;
    for (let column = 0; column < input.length; column++) {
        for (let cell = 0; cell < input[column].length; cell++) {
            if (input[column][cell] !== "@") continue;
            let surroundingRolls = 0;

            const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ];
            for (const [y, x] of directions) {
                if (input[column - y]?.[cell - x] === "@") surroundingRolls++;
            }

            if (surroundingRolls < 4) accessibleRolls++;
        }
    }

    return accessibleRolls;
}

test("Eample2", () => {
    const data = [
        "..@@.@@@@.",
        "@@@.@.@.@@",
        "@@@@@.@.@@",
        "@.@@@@..@.",
        "@@.@@@@.@@",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "@.@@@.@@@@",
        ".@@@@@@@@.",
        "@.@.@@@.@.",
    ];
    const result = getAccessibleRollsRecursive(data);
    expect(result).toBe(43);
});
test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getAccessibleRollsRecursive(data);
    expect(result).toBe(8643);
});
function getAccessibleRollsRecursive(input: string[]): number {
    let accessibleRolls: { x: number; y: number }[] = [];
    for (let column = 0; column < input.length; column++) {
        for (let cell = 0; cell < input[column].length; cell++) {
            if (input[column][cell] !== "@") continue;
            let surroundingRolls = 0;

            const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ];
            for (const [y, x] of directions) {
                if (input[column - y]?.[cell - x] === "@") surroundingRolls++;
            }

            if (surroundingRolls < 4) accessibleRolls.push({ x: cell, y: column });
        }
    }

    for (const { x, y } of accessibleRolls) {
        const column = [...input[y]];
        column.splice(x, 1, "x");
        input[y] = column.join("");
    }

    let getAccessibleRollCount = accessibleRolls.length;

    if (accessibleRolls.length > 0) {
        getAccessibleRollCount += getAccessibleRollsRecursive(input);
    }

    return getAccessibleRollCount;
}
