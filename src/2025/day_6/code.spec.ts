import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Example1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = solveMathProblems(data);
    expect(result).toBe(4277556);
});

test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = solveMathProblems(data);
    expect(result).toBe(5877594983578);
});

const aggregator: Record<string, (prev: number, current: number) => number> = {
    "*": (prev, curr) => prev * curr,
    "+": (prev, curr) => prev + +curr,
};

function solveMathProblems(input: string[]): number {
    const problems: string[][] = [];
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
        totalSum += +problem.map((x) => +x).reduce(aggregator[sign]);
    }

    return totalSum;
}

test("Example2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = solveMathProblemExtended(data);
    expect(result).toBe(3263827);
});
test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = solveMathProblemExtended(data);
    expect(result).toBe(11159825706149);
});

function solveMathProblemExtended(input: string[]): number {
    const problems: string[][][] = [];
    const matrix: string[][] = input.map((x) => x.split(""));
    const rows = matrix.length;
    let currentProblem: string[][] = [];
    while (matrix[0]?.length) {
        const chars = [...new Array(rows)]
            .map((_x, i) => matrix[i].pop())
            .filter((x) => x !== undefined);
        if (chars.every((x) => !x?.trim())) {
            problems.push(currentProblem);
            currentProblem = [];
            continue;
        }

        for (let row = 0; row < chars.length; row++) {
            if (currentProblem[row]) currentProblem[row].unshift(chars[row]);
            else currentProblem[row] = [chars[row]];
        }
    }
    problems.push(currentProblem);
    currentProblem = [];
    let totalSum = 0;

    //GenerateNumbers
    for (const problem of problems) {
        const numbers: number[] = [];
        const operator = problem.pop()?.join("").trim() ?? "";
        while (problem[0].length) {
            const verticalNumberStr = problem.map((_x, i) => problem[i].pop());
            const number = +verticalNumberStr.join("");
            numbers.push(number);
        }
        totalSum += +numbers.reduce(aggregator[operator]);
    }

    return totalSum;
}
