import { Tree } from "./Tree.js";

export class Forest {
  public trees: Tree[][];

  constructor() {
    this.trees = [];
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

  public visibleTrees(): Tree[] {
    return this.trees.flat().filter((tree) => tree.isVisible());
  }
}
