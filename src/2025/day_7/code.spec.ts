import { expect, test } from "vitest";
import { Matrix, type Direction } from "../../matrix";
import { getFileContent } from "../utilts";
import { resolve } from "path";

const instructions = {
    start: "S",
    beam: "|",
    splitter: "^",
    empty: ".",
} as const satisfies Record<string, string>;

test("Example1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = getBeamSplits(data);
    expect(result).toBe(21);
});
test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getBeamSplits(data);
    expect(result).toBe(1690);
});

function getBeamSplits(input: string[]): number {
    const matrix = new Matrix(input);
    let splittersHit = 0;
    for (const { value, col, row } of matrix) {
        switch (value) {
            case instructions.start: {
                matrix.replace(instructions.beam, [col, row], "down");
                continue;
            }
            case instructions.beam: {
                const splitterIsBelow = matrix.peek([col, row], "down") === instructions.splitter;
                if (splitterIsBelow) {
                    splittersHit++;
                    matrix.replace(instructions.beam, [col, row], "downLeft");
                    matrix.replace(instructions.beam, [col, row], "downRight");
                    continue;
                }

                matrix.replace(instructions.beam, [col, row], "down");
            }
        }
    }

    return splittersHit;
}

test("Example2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "example.txt"));
    const result = getBeamQuantumSplits(data);
    expect(result).toBe(40);
});
test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "input.txt"));
    const result = getBeamQuantumSplits(data);
    expect(result).toBe(1690);
});
function getBeamQuantumSplits(input: string[] | Matrix): number {
    let timeLines = 1;

    function resolveRemainingMatrix(input: string[] | Matrix) {
        const matrix = Array.isArray(input) ? new Matrix(input) : input;
        for (const { value, col, row } of matrix) {
            switch (value) {
                case instructions.start: {
                    matrix.replace(instructions.beam, [col, row], "down");
                    continue;
                }
                case instructions.beam: {
                    const splitterIsBelow =
                        matrix.peek([col, row], "down") === instructions.splitter;
                    if (splitterIsBelow) {
                        timeLines++;
                        for (const direction of ["downLeft", "downRight"] satisfies Direction[]) {
                            const subMatrix = matrix.clone();
                            subMatrix.replace(instructions.beam, [col, row], direction);
                            subMatrix.matrix.splice(0, row + 1);
                            resolveRemainingMatrix(subMatrix);
                        }
                        continue;
                    }

                    matrix.replace(instructions.beam, [col, row], "down");
                }
            }
        }
    }

    resolveRemainingMatrix(input);

    return timeLines;
}
