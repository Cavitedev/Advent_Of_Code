import { calculateConnectedCubes } from "./18.js";
import { LavaMap } from "./lavaMap.js";

describe("18.1", () => {

    it("Building boulders of size 3 generated 3x3x3 array of independent values", () => {

        const lavaMap = new LavaMap(3);

        expect(lavaMap.boulders.length).toEqual(3);
        expect(lavaMap.boulders[0].length).toEqual(3);
        expect(lavaMap.boulders[0][0].length).toEqual(3);

        expect(lavaMap.boulders[0][0][0].isBoulder).toEqual(false);
        expect(lavaMap.boulders[0][1][0].isBoulder).toEqual(false);
        lavaMap.boulders[0][0][0].isBoulder = true;
        expect(lavaMap.boulders[0][0][0].isBoulder).toEqual(true);
        expect(lavaMap.boulders[0][1][0].isBoulder).toEqual(false);
    });

    it("Reading lines of 2 positions that are not adyacent adds those positions and the total connected area is 10", () => {

        const lavaMap = new LavaMap(3);
        lavaMap.readLine("2,2,2");
        lavaMap.readLine("0,2,2");

        expect(lavaMap.boulders[2][2][2].isBoulder).toEqual(true);
        expect(lavaMap.boulders[0][2][2].isBoulder).toEqual(true);
        expect(lavaMap.connectedFaces).toEqual(12);
    });

    it("Reading lines of 2 adyacent positions adds those positions and the total connected area is 10", () => {

        const lavaMap = new LavaMap(3);
        lavaMap.readLine("2,2,2");
        lavaMap.readLine("1,2,2");

        expect(lavaMap.boulders[2][2][2].isBoulder).toEqual(true);
        expect(lavaMap.boulders[1][2][2].isBoulder).toEqual(true);
        expect(lavaMap.connectedFaces).toEqual(10);

    })

    it("Ready 6 cubes leaving an empty gap includes area when it is set to true", () => {

        const lavaMap = new LavaMap(3);
        lavaMap.readLine("0,1,1");
        lavaMap.readLine("2,1,1");
        lavaMap.readLine("1,2,1");
        lavaMap.readLine("1,0,1");
        lavaMap.readLine("1,1,2");
        lavaMap.readLine("1,1,0");
        expect(lavaMap.connectedFaces).toEqual(36);

    })


    it("Test with test.txt", async () => {
        const result = await calculateConnectedCubes(true, 10, "test.txt");
        expect(result).toEqual(64)
    });

    it("Test with input.txt", async () => {
        const result = await calculateConnectedCubes(true, 20, "input.txt");
        expect(result).toEqual(3496)
    });


});