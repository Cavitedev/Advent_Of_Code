import { MapCell } from "./cellsMonkeyMap.js";
import { Direction, Right } from "./direction.js";
import { MonkeyMap } from "./monkeyMap.js";

export class MonkeyPath {
  public walkingPerson: WalkingPerson;
  public monkeyMap: MonkeyMap;

  constructor(monkeyMap: MonkeyMap) {
    this.monkeyMap = monkeyMap;
  }

  public readLine(line: string) {
    if (!line) return;
    const isPath = /[1-9RL]/.test(line[0]);

    if (isPath) {
      const firstCell = this.monkeyMap.getFirstCell();
      this.walkingPerson = new WalkingPerson(firstCell, line);
    } else {
      this.monkeyMap.readMapLine(line);
    }
  }

  public finishReading() {
    this.monkeyMap.finishReading();
  }

  public walk() {
    this.walkingPerson.walk(this.monkeyMap);
  }
}

export class WalkingPerson {
  public dir: Direction;
  public currentCell: MapCell;
  public actions: string;
  public actionIndex: number;

  constructor(currentCell: MapCell, actions: string) {
    this.dir = Right.Instance;
    this.currentCell = currentCell;
    this.actions = actions;
    this.actionIndex = 0;
  }

  public walk(monkeyMap: MonkeyMap) {
    monkeyMap.person = this;
    let nextAction = this.nextAction();
    while (nextAction) {
      this.executeAction(nextAction, monkeyMap);
      nextAction = this.nextAction();
    }
  }

  public executeAction(nextAction: string, monkeyMap: MonkeyMap) {
    if (nextAction === "R") {
      this.dir = this.dir.moveRight;
    } else if (nextAction === "L") {
      this.dir = this.dir.moveLeft;
    } else {
      const posToMove: number = +nextAction;
      this.currentCell = monkeyMap.cellAfterNMovementsDir(
        this.currentCell,
        posToMove
      );
    }
  }

  public nextAction(): string {
    if (this.actionIndex === this.actions.length) return "";
    let rIndex = this.actions.indexOf("R", this.actionIndex);
    let lIndex = this.actions.indexOf("L", this.actionIndex);

    let rotateIndex: number;
    if (rIndex === -1 && lIndex === -1) {
      rotateIndex = this.actions.length;
    } else if (rIndex === -1) {
      rotateIndex = lIndex;
    } else if (lIndex === -1) {
      rotateIndex = rIndex;
    } else {
      rotateIndex = Math.min(lIndex, rIndex);
    }

    if (rotateIndex === this.actionIndex) {
      return this.actions[this.actionIndex++];
    }

    const nextPositions = this.actions.substring(this.actionIndex, rotateIndex);
    this.actionIndex = rotateIndex;
    return nextPositions;
  }
}
