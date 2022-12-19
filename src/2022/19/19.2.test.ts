import { firstGeodesMultiplied as firstMaxGeodesMultiplied } from "./19.2.js";

describe("19.2", () => {


    test("Test with test.txt", async () => {
        const geodes = await firstMaxGeodesMultiplied(3, 32, "test.txt");
        expect(geodes).toEqual(3472)
    });

    test("Test with input.txt", async () => {
        const geodes = await firstMaxGeodesMultiplied(3, 32, "input.txt");
        expect(geodes).toEqual(21840)
    });

});