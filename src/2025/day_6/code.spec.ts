import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Example1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = solveMathProblems(data);
    expect(result).toBe(4277556)
})

test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = solveMathProblems(data);
    expect(result).toBe(5877594983578)
})

function solveMathProblems(input: string[]): number {
    let problems: string[][] = [];
    for (const line of input) {
        line.split(" ")
            .filter((x) => !!x)
            .forEach((val, index) => {
                problems[index] = [...(problems[index] ?? []), val];
            });
    }

    let totalSum = 0;
    for (const problem of problems) {
        const sign = problem.pop();
        if (!sign) throw "";
        let aggregator: (prev: string, current: string) => string;
        switch (sign) {
            case "*": {
                aggregator = (prev, curr) => `${+prev * +curr}`;
                break;
            }
            case "+": {
                aggregator = (prev, curr) => `${+prev + +curr}`;
                break;
            }
            default:
                throw "";
        }
        totalSum += +problem.reduce(aggregator);
    }

    return totalSum;
}
