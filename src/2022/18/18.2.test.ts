import { calculateConnectedCubes } from "./18.js";
import { LavaMap } from "./lavaMap.js";

describe("18.2", () => {


    it("Reading 6 cubes leaving an empty gap excludes area when it is called", () => {

        const lavaMap = new LavaMap(3);
        lavaMap.readLine("0,1,1");
        lavaMap.readLine("2,1,1");
        lavaMap.readLine("1,2,1");
        lavaMap.readLine("1,0,1");
        lavaMap.readLine("1,1,2");
        lavaMap.readLine("1,1,0");
        lavaMap.excludeInteriorArea();
        expect(lavaMap.connectedFaces).toEqual(30);

    })
    it("Reading 10 cubes leaving 2 empty gap excludes area when it is called", () => {

        const lavaMap = new LavaMap(4);
        lavaMap.readLine("0,1,1");
        lavaMap.readLine("2,1,1");
        lavaMap.readLine("1,3,1");
        lavaMap.readLine("1,0,1");
        lavaMap.readLine("1,1,2");
        lavaMap.readLine("1,1,0");
        lavaMap.readLine("2,2,1");
        lavaMap.readLine("0,2,1");
        lavaMap.readLine("1,2,2");
        lavaMap.readLine("1,2,0");
        lavaMap.excludeInteriorArea();

        expect(lavaMap.connectedFaces).toEqual(42);

    })

    it("Test with test.txt", async () => {
        const result = await calculateConnectedCubes(false, 10, "test.txt");
        expect(result).toEqual(58)
    });

    it("Test with input.txt", async () => {
        const result = await calculateConnectedCubes(false, 20, "input.txt");
        expect(result).toEqual(2064)
    });

})