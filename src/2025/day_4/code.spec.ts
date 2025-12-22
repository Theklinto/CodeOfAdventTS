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
})
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
