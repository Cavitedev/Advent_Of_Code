import { Tree, VisibilityDirection } from "../../src/2022/8/Tree.js";
import { Forest } from "../../src/2022/8/Forest.js";
import {
  bestScenicValueInForest,
  treeHouseCounter,
} from "../../src/2022/8/8treeHouse.js";

describe("Eigth problem from Advent Code 2022", () => {
  describe("First part of the problem", () => {
    it("Visibility starts with isChecked and isVisible as false", () => {
      const visibilityDirection = new VisibilityDirection();
      expect(visibilityDirection.hasChecked).toEqual(false);
      expect(visibilityDirection.isVisible).toEqual(false);
    });
    it("Tree has right height when built", () => {
      const height = 1;
      const tree = new Tree(height);
      expect(tree.height).toEqual(height);
    });
    it("Tree has no visibility and no check when it is built", () => {
      const tree = new Tree(1);
      const visibilityDirection = new VisibilityDirection();

      const expected = Array(4).fill(visibilityDirection);
      expect(tree.visibilityDirections).toEqual(expected);
    });

    it("First visibility is the left one", () => {
      const tree = new Tree(1);
      expect(tree.leftVisibility).toBe(tree.visibilityDirections[0]);
    });

    it("Second visibility is the up one", () => {
      const tree = new Tree(1);
      expect(tree.upVisibility).toBe(tree.visibilityDirections[1]);
    });

    it("Right visibility is the right one", () => {
      const tree = new Tree(1);
      expect(tree.rightVisibility).toBe(tree.visibilityDirections[2]);
    });

    it("Fourth visibility is the down one", () => {
      const tree = new Tree(1);
      expect(tree.downVisibility).toBe(tree.visibilityDirections[3]);
    });

    it("Changing left visibility doesn't affect other visibilities", () => {
      const tree = new Tree(1);
      tree.leftVisibility.isVisible = true;
      expect(tree.leftVisibility.isVisible).toEqual(true);
      expect(tree.upVisibility.isVisible).toEqual(false);
      expect(tree.rightVisibility.isVisible).toEqual(false);
      expect(tree.downVisibility.isVisible).toEqual(false);
    });

    it("Setting all sides of a tree as invisible makes it invisible", () => {
      const tree = new Tree(1);
      tree.visibilityDirections.forEach(
        (visibility) => (visibility.isVisible = false)
      );
      expect(tree.isVisible()).toEqual(false);
    });

    it("Setting all sides of a tree as invisible expect 1 makes it visible", () => {
      const tree = new Tree(1);
      tree.visibilityDirections.forEach(
        (visibility) => (visibility.isVisible = false)
      );
      tree.downVisibility.isVisible = true;
      expect(tree.isVisible()).toEqual(true);
    });

    it("Forest add line creates the trees with the right visibility left and right", () => {
      const line = "1312";
      const forest = new Forest();

      const trees = [[new Tree(1), new Tree(3), new Tree(1), new Tree(2)]];
      trees[0][0].leftVisibility.isVisible = true;
      trees[0][1].leftVisibility.isVisible = true;
      trees[0][2].leftVisibility.isVisible = false;
      trees[0][3].leftVisibility.isVisible = false;

      trees[0][0].rightVisibility.isVisible = false;
      trees[0][1].rightVisibility.isVisible = true;
      trees[0][2].rightVisibility.isVisible = false;
      trees[0][3].rightVisibility.isVisible = true;

      forest.addRow(line);
      expect(forest.trees).toEqual(trees);
    });

    it("Check vertical visibility works on a 3x3 forest", () => {
      const forest = new Forest();
      forest.addRow("141");
      forest.addRow("424");
      forest.addRow("141");

      const expectedMiddleTree = new Tree(2);
      expectedMiddleTree.leftVisibility.isVisible = false;
      expectedMiddleTree.upVisibility.isVisible = false;
      expectedMiddleTree.rightVisibility.isVisible = false;
      expectedMiddleTree.downVisibility.isVisible = false;

      forest.checkVerticalVisibility();

      expect(forest.trees[1][1]).toEqual(expectedMiddleTree);
      expect(forest.visibleTrees().length).toEqual(8);
    });

    it("Test with test.txt", async () => {
      const visibleTrees: number = await treeHouseCounter("test.txt");
      expect(visibleTrees).toEqual(21);
    });

    it("Test with input.txt", async () => {
      const visibleTrees: number = await treeHouseCounter("input.txt");
      expect(visibleTrees).toEqual(1703);
    });
  });

  describe("Second part of the problem", () => {
    it("Visibility Direction has amount of trees visible starting at 0", () => {
      const visibilityDirection = new VisibilityDirection();
      expect(visibilityDirection.visibleTrees).toEqual(0);
    });

    it("Tree scenic value is the product of each amount of visible trees", () => {
      const tree = new Tree(1);
      tree.leftVisibility.visibleTrees = 2;
      tree.upVisibility.visibleTrees = 1;
      tree.rightVisibility.visibleTrees = 1;
      tree.downVisibility.visibleTrees = 3;

      // 2 * 1 * 1 * 3
      expect(tree.scenicScore()).toEqual(6);
    });

    it("Trees left from", () => {
      const forest = new Forest();
      forest.addRow("1414");
      forest.addRow("4223");
      forest.addRow("1451");

      const treesLeft = forest.treesLeftFrom(1, 2);
      const treesHeight = treesLeft.map((tree) => tree.height);
      expect(treesHeight).toEqual([2, 4]);
    });

    it("Trees up from", () => {
      const forest = new Forest();
      forest.addRow("1414");
      forest.addRow("4223");
      forest.addRow("1451");

      const treesLeft = forest.treesUpFrom(1, 2);
      const treesHeight = treesLeft.map((tree) => tree.height);
      expect(treesHeight).toEqual([1]);
    });

    it("Trees right from", () => {
      const forest = new Forest();
      forest.addRow("1414");
      forest.addRow("4223");
      forest.addRow("1451");

      const treesRight = forest.treesRightFrom(1, 2);
      const treesHeight = treesRight.map((tree) => tree.height);
      expect(treesHeight).toEqual([3]);
    });

    it("Trees down from", () => {
      const forest = new Forest();
      forest.addRow("1414");
      forest.addRow("4223");
      forest.addRow("1451");

      const treesDown = forest.treesDownFrom(1, 2);
      const treesHeight = treesDown.map((tree) => tree.height);
      expect(treesHeight).toEqual([5]);
    });

    it("Check the amount of visible trees on each direction and returning ", () => {
      const forest = new Forest();
      forest.addRow("1414");
      forest.addRow("4321");
      forest.addRow("1411");

      const expectedMiddleTree = new Tree(2);
      expectedMiddleTree.leftVisibility.visibleTrees = 1;
      expectedMiddleTree.upVisibility.visibleTrees = 1;
      expectedMiddleTree.rightVisibility.visibleTrees = 2;
      expectedMiddleTree.downVisibility.visibleTrees = 1;

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
});
