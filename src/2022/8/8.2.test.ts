import { Tree, VisibilityDirection } from "./tree.js";
import { West, North, East, South } from "./direction.js";
import { Forest } from "./forest.js";
import { bestScenicValueInForest } from "./8.2.js";

describe("8.2", () => {
  it("Visibility Direction has amount of trees visible starting at 0", () => {
    const visibilityDirection = new VisibilityDirection();
    expect(visibilityDirection.visibleTrees).toEqual(0);
  });

  it("Tree scenic value is the product of each amount of visible trees", () => {
    const tree = new Tree(1);
    West.Instance.getVisibility(tree).visibleTrees = 2;
    North.Instance.getVisibility(tree).visibleTrees = 1;
    East.Instance.getVisibility(tree).visibleTrees = 1;
    South.Instance.getVisibility(tree).visibleTrees = 3;

    // 2 * 1 * 1 * 3
    expect(tree.scenicScore()).toEqual(6);
  });

  it("Trees left from", () => {
    const forest = new Forest();
    forest.addRow("1414");
    forest.addRow("4223");
    forest.addRow("1451");

    const treesLeft = forest.treesFromTowards(1, 2, West.Instance);
    const treesHeight = treesLeft.map((tree) => tree.height);
    expect(treesHeight).toEqual([2, 4]);
  });

  it("Trees up from", () => {
    const forest = new Forest();
    forest.addRow("1414");
    forest.addRow("4223");
    forest.addRow("1451");

    const treesLeft = forest.treesFromTowards(1, 2, North.Instance);
    const treesHeight = treesLeft.map((tree) => tree.height);
    expect(treesHeight).toEqual([1]);
  });

  it("Trees right from", () => {
    const forest = new Forest();
    forest.addRow("1414");
    forest.addRow("4223");
    forest.addRow("1451");

    const treesRight = forest.treesFromTowards(1, 2, East.Instance);
    const treesHeight = treesRight.map((tree) => tree.height);
    expect(treesHeight).toEqual([3]);
  });

  it("Trees down from", () => {
    const forest = new Forest();
    forest.addRow("1414");
    forest.addRow("4223");
    forest.addRow("1451");

    const treesDown = forest.treesFromTowards(1, 2, South.Instance);
    const treesHeight = treesDown.map((tree) => tree.height);
    expect(treesHeight).toEqual([5]);
  });

  it("Check the amount of visible trees on each direction and returning ", () => {
    const forest = new Forest();
    forest.addRow("1414");
    forest.addRow("4321");
    forest.addRow("1411");

    const expectedMiddleTree = new Tree(2);
    West.Instance.getVisibility(expectedMiddleTree).visibleTrees = 1;
    North.Instance.getVisibility(expectedMiddleTree).visibleTrees = 1;
    East.Instance.getVisibility(expectedMiddleTree).visibleTrees = 2;
    South.Instance.getVisibility(expectedMiddleTree).visibleTrees = 1;

    forest.checkVerticalVisibility();
    forest.checkAmountOfVisibleTreesOnEachDirection();

    expect(forest.trees[1][1].scenicScore()).toEqual(2);
    expect(forest.bestScenicValue()).toEqual(2);
  });

  it("Test with test.txt", async () => {
    const bestScenicValue = await bestScenicValueInForest("test.txt");
    expect(bestScenicValue).toEqual(8);
  });

  it("Test with input.txt", async () => {
    const bestScenicValue = await bestScenicValueInForest("input.txt");
    expect(bestScenicValue).toEqual(496650);
  });
});
