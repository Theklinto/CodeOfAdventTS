import { expect, test } from "vitest";
import { getFileContent } from "../utilts";
import { resolve } from "path";

test("Example1", () => {
    const data = [
        "11-22",
        "95-115",
        "998-1012",
        "1188511880-1188511890",
        "222220-222224",
        "1698522-1698528",
        "446443-446449",
        "38593856-38593862",
        "565653-565659",
        "824824821-824824827",
        "2121212118-2121212124",
    ];
    expect(getInvalidProductsSum(data)).toBe(1227775554);
});
test("Input1", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"), { splitBy: "," });
    expect(getInvalidProductsSum(data)).toBe(21139440284);
});

function getInvalidProductsSum(productsIdRanges: string[]): number {
    let invalidSum = 0;

    for (const productIdRange of productsIdRanges) {
        let [firstId, lastId] = productIdRange.split("-").map((x) => +x);
        for (let i = firstId ?? 0; i < (lastId ?? 0) + 1; i++) {
            const productId = i.toString();
            const firstSequence = productId.substring(0, productId.length / 2);
            if (productId.toString() === `${firstSequence}${firstSequence}`) invalidSum += i;
        }
    }

    return invalidSum;
}

test("Example1", () => {
    const data = [
        "11-22",
        "95-115",
        "998-1012",
        "1188511880-1188511890",
        "222220-222224",
        "1698522-1698528",
        "446443-446449",
        "38593856-38593862",
        "565653-565659",
        "824824821-824824827",
        "2121212118-2121212124",
    ];
    expect(getInvalidProductsSumExtended(data)).toBe(4174379265);
});

//Slow
test("Input2", () => {
    const data = getFileContent(resolve(import.meta.dirname, "part_one.txt"), { splitBy: "," });
    expect(getInvalidProductsSumExtended(data)).toBe(38731915928);
});

function getInvalidProductsSumExtended(productsIdRanges: string[]): number {
    let invalidSum = 0;

    for (const productIdRange of productsIdRanges) {
        let [firstId, lastId] = productIdRange.split("-").map((x) => +x);
        for (let i = firstId ?? 0; i < (lastId ?? 0) + 1; i++) {
            const productId = i.toString();
            const productIdArray = productId.split("");
            for (let j = 0; j < productIdArray.length; j++) {
                const sequence = productIdArray.slice(0, j + 1).join("");
                const sequenceRegex = new RegExp(`^(${sequence}){2,}$`);
                if (sequenceRegex.test(productId)) {
                    invalidSum += i;
                    break;
                }
            }
        }
    }

    return invalidSum;
}
