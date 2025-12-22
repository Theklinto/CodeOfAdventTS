import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Example1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = getFreshIngredients(data);
    expect(result).toBe(3);
})

test("Input1", () => {
        const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getFreshIngredients(data);
    expect(result).toBe(529);
})

function getFreshIngredients(input: string[]): number {
    let freshIngredients = 0;
    const freshIdRanges: { start: number; end: number }[] = [];
    let findingRanges = true;
    for (const line of input) {
        if (!line.trim()) {
            findingRanges = false;
            continue;
        }
        if (findingRanges) {
            const [start, end] = line.split("-");
            freshIdRanges.push({ start: +start, end: +end });
            continue;
        }

        const ingredientId = +line;
        if(freshIdRanges.some(range => range.start <= ingredientId && range.end >= ingredientId)) freshIngredients++;
    }

    return freshIngredients;
}
