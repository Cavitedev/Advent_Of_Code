import { Tree } from "./Tree.js";
import {
  West,
  North,
  East,
  South,
  Direction,
} from "./Direction.js";

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

    this._addTreesToRow(row, treeRow);
    this.trees.push(treeRow);
    const rowIndex = this.trees.length - 1;

    West.Instance.checkVisibility(rowIndex, this.trees);
    East.Instance.checkVisibility(rowIndex, this.trees);
  }

  private _addTreesToRow(row: string, treeRow: Tree[]) {
    for (let i = 0; i < row.length; i++) {
      const height: number = +row.charAt(i);
      const tree = new Tree(height);
      treeRow.push(tree);
    }
  }

  public checkVerticalVisibility() {
    for (let j = 0; j < this.trees[0].length; j++) {
      North.Instance.checkVisibility(j, this.trees);
      South.Instance.checkVisibility(j, this.trees);
    }
  }

  public checkAmountOfVisibleTreesOnEachDirection() {
    for (let i = 0; i < this.trees.length; i++) {
      for (let j = 0; j < this.trees[i].length; j++) {
        const tree = this.trees[i][j];
        for (const orientation of Direction.Directions()) {
          this.checkAmountOfVisibleTrees(i, j, tree, orientation);
        }
      }
    }
  }

  private checkAmountOfVisibleTrees(
    i: number,
    j: number,
    tree: Tree,
    orientation: Direction
  ) {
    const trees = this.treesFromTowards(i, j, orientation);
    const visibleTreesLeft = Forest.VisibleTreesFromHeightThroughLine(
      tree.height,
      trees
    );
    orientation.getVisibility(tree).visibleTrees = visibleTreesLeft.length;
  }

  public treesFromTowards(
    i: number,
    j: number,
    orientation: Direction
  ): Tree[] {
    return orientation.matrixElements(i, j, this.trees);
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
