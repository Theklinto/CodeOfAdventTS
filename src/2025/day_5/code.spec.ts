import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Example1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = getFreshIngredients(data);
    expect(result).toBe(3);
});

test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getFreshIngredients(data);
    expect(result).toBe(529);
});

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
        if (freshIdRanges.some((range) => range.start <= ingredientId && range.end >= ingredientId))
            freshIngredients++;
    }

    return freshIngredients;
}

test("Custom", () => {
    const result = getFreshIngredientCount(["3-5"]);
    expect(result).toBe(3);
});
test("Example", () => {
    const data = ["3-5", "10-14", "16-20", "12-18"];
    const result = getFreshIngredientCount(data);
    expect(result).toBe(14);
});


test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getFreshIngredientCount(data);
    expect(result).toBe(344260049617193);
});

test("input_Cut", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input_subset.txt"));
    const result = getFreshIngredientCount(data);
    expect(result).toBe(8_837_352_173_079);
});

test("case", () => {
    const data = ["15-19", "16-18"];
    const result = getFreshIngredientCount(data);
    expect(result).toBe(5);
});

type Range = { start: number; end: number };
function getFreshIngredientCount(input: string[]): number {
    const freshIdRanges: Range[] = [];
    for (const line of input) {
        const [start, end] = line.split("-");
        if (start === undefined || end === undefined) break;
        freshIdRanges.push({ start: +start, end: +end });
    }

    const mergedRanges = mergeRanges(...freshIdRanges);
    let totalFreshIngredients = 0;
    mergedRanges.forEach((x) => (totalFreshIngredients += x.end - x.start + 1));
    return totalFreshIngredients;
}

function mergeRanges(...ranges: Range[]): Range[] {
    let mergedRanges: Range[] = [];
    for (const range of ranges) {
        const mergableRangeIndex = mergedRanges.findIndex((x) => {
            const canAbsorb = x.end <= range.end && x.start >= range.start || range.end <= x.end && range.start >= x.start;
            const overlapLower =
                range.start <= x.start && range.end <= x.end && range.end >= x.start;
            const overlapUpper =
                range.end >= x.end && range.start >= x.start && range.start <= x.end;

            return canAbsorb || overlapUpper || overlapLower;
        });
        if (mergableRangeIndex === -1) {
            mergedRanges.push(range);
            continue;
        }
        const mergableRange = mergedRanges[mergableRangeIndex];

        mergedRanges.splice(mergableRangeIndex, 1);
        mergableRange.end = Math.max(range.end, mergableRange.end);
        mergableRange.start = Math.min(range.start, mergableRange.start);
        mergedRanges.push(mergableRange);
    }

    if (mergedRanges.length !== ranges.length) {
        mergedRanges = mergeRanges(...mergedRanges);
    }

    return mergedRanges;
}
