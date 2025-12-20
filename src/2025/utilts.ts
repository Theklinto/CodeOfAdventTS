import fs from "fs";

type FileOptions = {
    splitBy?: string
}
export function getFileContent(filePath: string, options?: FileOptions): string[] {
    //Read file content and return each line as an array of strings
    const lines = fs.readFileSync(filePath, "utf-8").split(options?.splitBy ?? "\n");
    return lines.filter((line: string) => line.trim() !== "");
}