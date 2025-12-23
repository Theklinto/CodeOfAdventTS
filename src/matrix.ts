export const directions = {
    up: [0, -1],
    upLeft: [-1, -1],
    upRight: [1, -1],
    left: [-1, 0],
    right: [1, 0],
    down: [0, 1],
    downLeft: [-1, 1],
    downRight: [1, 1],
} as const satisfies Record<string, Position>;

export type Position = [x: number, y: number];
export type Direction = keyof typeof directions;
export class Matrix {
    private _matrix: string[][];
    constructor(value: string[]) {
        this._matrix = value.map((x) => x.split(""));
    }

    get rows() {
        return this._matrix.length;
    }
    get columns() {
        return Math.max(...this._matrix.map((x) => x.length));
    }
    get matrix() {
        return this._matrix;
    }

    peek(position: Position, direction: Direction): string | undefined {
        const [x, y] = directions[direction];
        return this._matrix[position[1] + y]?.[position[0] + x];
    }

    replace(value: string, position: Position, direction?: Direction) {
        let [x, y] = position;
        if (direction) {
            const resolvedDirection = directions[direction];
            x = x + resolvedDirection[0];
            y = y + resolvedDirection[1];
        }
        if (this._matrix[y]?.[x]) {
            this._matrix[y][x] = value;
        }
    }

    *[Symbol.iterator]() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < (this._matrix[row]?.length ?? 0); col++) {
                yield { value: this._matrix[row][col], row, col };
            }
        }
    }
}
