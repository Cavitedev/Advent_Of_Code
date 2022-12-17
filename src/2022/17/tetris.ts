export class Tetris {
  public tetrixMatrix: string[][];
  private static _PieceHeight: number = 3;
  private static _SepHeight: number = 3;

  constructor() {
    this.tetrixMatrix = [
      ["+", "-", "-", "-", "-", "-", "-", "-", "+"],
      ["|", ".", ".", ".", ".", ".", ".", ".", "|"],
    ];
  }

  public simulateMovements(input: string, piecesCount: number): number {
    let currentPieceIndex = 0;
    let currentMovementIndex = 0;
    let savePlacements = [{ height: 0, piece: 0, movement: 0, index: 0 }];

    for (let iter = 0; iter < piecesCount; iter++) {
      let currentPiece = pieces[currentPieceIndex];
      currentPieceIndex = (currentPieceIndex + 1) % pieces.length;

      let verticalPos = this._fillMatrix();
      let horizontalPos = 3;

      let placed: boolean = false;
      //Check overlap

      while (!placed) {
        let movementChar = input[currentMovementIndex];
        currentMovementIndex = (currentMovementIndex + 1) % input.length;
        const movementOffset: number = movementChar === ">" ? 1 : -1;
        const canMoveHorizontally = this._canMovePos(
          currentPiece,
          horizontalPos,
          verticalPos,
          movementOffset,
          0
        );
        if (canMoveHorizontally) {
          horizontalPos += movementOffset;
        }

        const canMoveDown = this._canMovePos(
          currentPiece,
          horizontalPos,
          verticalPos,
          0,
          -1
        );

        if (!canMoveDown) {
          this._placePiece(currentPiece, horizontalPos, verticalPos);
          placed = true;
        } else {
          verticalPos -= 1;
        }
      }
      const patternPieces = savePlacements.filter(
        (p) =>
          p.piece === currentPieceIndex && p.movement == currentMovementIndex
      );
      if (patternPieces.length > 2) {
        const pat1 = patternPieces[1];
        const pat2 = patternPieces[2];

        const difHeight = pat2.height - pat1.height;
        const patternLength = pat2.index - pat1.index;
        const itersAfterPattern = piecesCount - pat1.index;
        const fullIters = Math.floor(itersAfterPattern / patternLength);
        const itersLastPattern = itersAfterPattern % patternLength;
        const finalHeight =
          savePlacements[pat1.index + itersLastPattern].height - pat1.height;

        const retHeight = pat1.height + fullIters * difHeight + finalHeight;
        return retHeight;
      }

      savePlacements.push({
        height: this._lastEmptyRow() - 1,
        piece: currentPieceIndex,
        movement: currentMovementIndex,
        index: iter,
      });
    }

    // -1 because it needs the floor below, bottom floor is index 0, so first floor to count is 1
    return this._lastEmptyRow() - 1;
  }

  public displayStrTetris(): string {
    return this.tetrixMatrix
      .map((_, index) =>
        this.tetrixMatrix[this.tetrixMatrix.length - 1 - index].join("")
      )
      .join("\n");
  }

  private _placePiece(
    currentPiece: string[][],
    horizontalPos: number,
    pieceHeight: number
  ) {
    for (let i = currentPiece.length - 1; i >= 0; i--) {
      const pieceRow = currentPiece[i];
      for (let j = 0; j < pieceRow.length; j++) {
        const pieceCell = pieceRow[j];
        if (pieceCell === ".") continue;
        if (pieceCell === "#") {
          let currentX = horizontalPos + j;
          let currentY = pieceHeight + (currentPiece.length - i - 1);

          this.tetrixMatrix[currentY][currentX] = pieceCell;
        }
      }
    }
  }

  private _canMovePos(
    currentPiece: string[][],
    horizontalPos: number,
    pieceHeight: number,
    positionsX: number,
    positionsY: number
  ): boolean {
    for (let i = currentPiece.length - 1; i >= 0; i--) {
      const pieceRow = currentPiece[i];
      for (let j = 0; j < pieceRow.length; j++) {
        const pieceCell = pieceRow[j];
        if (pieceCell === ".") continue;
        if (pieceCell === "#") {
          let currentX = horizontalPos + j;
          let currentY = pieceHeight + (currentPiece.length - i - 1);

          const tetrisCell =
            this.tetrixMatrix[currentY + positionsY][currentX + positionsX];
          if (this._isSolid(tetrisCell)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  private _fillMatrix(): number {
    let lastEmptyRow: number = this._lastEmptyRow();

    for (
      let i = this.tetrixMatrix.length;
      i <= lastEmptyRow + Tetris._SepHeight + Tetris._PieceHeight;
      i++
    ) {
      this.tetrixMatrix.push(["|", ".", ".", ".", ".", ".", ".", ".", "|"]);
    }

    return lastEmptyRow + Tetris._SepHeight;
  }

  private _lastEmptyRow() {
    let lastEmptyRow: number;
    for (let i = this.tetrixMatrix.length - 1; i >= 0; i--) {
      const row = this.tetrixMatrix[i];
      const allDots: boolean = row
        .slice(1, row.length - 1)
        .every((c) => c === ".");

      if (allDots) {
        lastEmptyRow = i;
      } else {
        break;
      }
    }
    return lastEmptyRow;
  }

  private _isSolid(cell: string) {
    return cell === "#" || cell === "-" || cell === "|";
  }
}

const pieces = [
  [["#", "#", "#", "#"]],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."],
  ],
  [
    [".", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "#"],
  ],
  [["#"], ["#"], ["#"], ["#"]],
  [
    ["#", "#"],
    ["#", "#"],
  ],
];
