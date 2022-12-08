import { Tree } from "./Tree.js";

export class Forest {
  public trees: Tree[][];

  constructor() {
    this.trees = [];
  }

  public visibleTrees(): Tree[] {
    return this.trees.flat().filter((tree) => tree.isVisible());
  }

  public bestScenicValue(): number {
    return Math.max(...this.trees.flat().map((tree) => tree.scenicScore()));
  }

  public addRow(row: string) {
    const treeRow: Tree[] = [];
    let maximumHeightLeft = -1;

    for (let i = 0; i < row.length; i++) {
      const height: number = +row.charAt(i);
      const tree = new Tree(height);
      const leftVisibility = height > maximumHeightLeft;
      if (leftVisibility) {
        maximumHeightLeft = height;
      }
      tree.leftVisibility.isVisible = leftVisibility;
      treeRow.push(tree);
    }

    let maximumHeightRight = -1;
    for (let i = row.length - 1; i >= 0; i--) {
      const height: number = +row.charAt(i);
      const tree = treeRow[i];
      const rightVisibility = height > maximumHeightRight;
      if (rightVisibility) {
        maximumHeightRight = height;
      }
      tree.rightVisibility.isVisible = rightVisibility;
    }

    this.trees.push(treeRow);
  }

  public checkVerticalVisibility() {
    for (let j = 0; j < this.trees[0].length; j++) {
      let maximumHeightUp = -1;
      for (let i = 0; i < this.trees.length; i++) {
        const tree = this.trees[i][j];
        const height = tree.height;
        const upVisibility = height > maximumHeightUp;
        if (upVisibility) {
          maximumHeightUp = height;
        }
        tree.upVisibility.isVisible = upVisibility;
      }

      let maximumHeightDown = -1;
      for (let i = this.trees.length - 1; i >= 0; i--) {
        const tree = this.trees[i][j];
        const height = tree.height;
        const downVisibility = height > maximumHeightDown;
        if (downVisibility) {
          maximumHeightDown = height;
        }
        tree.downVisibility.isVisible = downVisibility;
      }
    }
  }

  public checkAmountOfVisibleTreesOnEachDirection() {
    for (let i = 0; i < this.trees.length; i++) {
      for (let j = 0; j < this.trees[i].length; j++) {
        const tree = this.trees[i][j];
        const leftTrees = this.treesLeftFrom(i, j);
        const visibleTreesLeft = Forest.VisibleTreesFromHeightThroughLine(
          tree.height,
          leftTrees
        );
        tree.leftVisibility.visibleTrees = visibleTreesLeft.length;

        const upTrees = this.treesUpFrom(i, j);
        const visibleTreesUp = Forest.VisibleTreesFromHeightThroughLine(
          tree.height,
          upTrees
        );
        tree.upVisibility.visibleTrees = visibleTreesUp.length;

        const rightTrees = this.treesRightFrom(i, j);
        const visibleTreesRight = Forest.VisibleTreesFromHeightThroughLine(
          tree.height,
          rightTrees
        );
        tree.rightVisibility.visibleTrees = visibleTreesRight.length;

        const downTrees = this.treesDownFrom(i, j);
        const visibleTreesDown = Forest.VisibleTreesFromHeightThroughLine(
          tree.height,
          downTrees
        );
        tree.downVisibility.visibleTrees = visibleTreesDown.length;
      }
    }
  }

  public treesLeftFrom(i: number, j: number): Tree[] {
    const trees: Tree[] = [];

    for (let jIndex = j - 1; jIndex >= 0; jIndex--) {
      trees.push(this.trees[i][jIndex]);
    }

    return trees;
  }

  public treesUpFrom(i: number, j: number): Tree[] {
    const trees: Tree[] = [];

    for (let iIndex = i - 1; iIndex >= 0; iIndex--) {
      trees.push(this.trees[iIndex][j]);
    }

    return trees;
  }

  public treesRightFrom(i: number, j: number): Tree[] {
    const trees: Tree[] = [];

    for (let jIndex = j + 1; jIndex < this.trees[i].length; jIndex++) {
      trees.push(this.trees[i][jIndex]);
    }

    return trees;
  }

  public treesDownFrom(i: number, j: number): Tree[] {
    const trees: Tree[] = [];

    for (let iIndex = i + 1; iIndex < this.trees.length; iIndex++) {
      trees.push(this.trees[iIndex][j]);
    }

    return trees;
  }

  private static VisibleTreesFromHeightThroughLine(
    referenceHeight: number,
    trees: Tree[]
  ): Tree[] {
    const returnTrees: Tree[] = [];
    for (const tree of trees) {
      returnTrees.push(tree);
      if (tree.height >= referenceHeight) {
        break;
      }
    }

    return returnTrees;
  }
}
