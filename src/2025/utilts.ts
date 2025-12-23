import fs from "fs";

type FileOptions = {
    splitBy?: string;
};
export function getFileContent(filePath: string, options?: FileOptions): string[] {
    //Read file content and return each line as an array of strings
    const lines = fs.readFileSync(filePath, "utf-8").split(options?.splitBy ?? /\r?\n/);
    return lines;
}

export function getStringMatrix(val: string[]): string[][] {
    return val.map((x) => x.split(""));
}

