import { readFileLines } from "../../common/readfileLines.js";
import { HandShape } from "./handShape.js";
import { HandShapeFactory } from "./handShapeFactory.js";
import { RoundResult } from "./RoundResult.js";
import { RoundResultFactory } from "./RoundResultFactory.js";

export async function rockPaperScissorsScoreCounter2(
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let score = 0;

  const handShapeFactory = HandShapeFactory.Instance;
  const roundResultFactory = RoundResultFactory.Instance;

  for await (const line of rl) {
    const opponentActionLetter = line[0];
    const opponentAction: HandShape =
      handShapeFactory.createHandShape(opponentActionLetter);

    const roundResultLetter = line[2];
    const roundResult: RoundResult =
      roundResultFactory.createMatchResult(roundResultLetter);

    const yourAction: HandShape =
      opponentAction.handShapeForResultOpponent(roundResult);
    const roundScore = yourAction.scoreRound(opponentAction);
    score += roundScore;
  }

  console.log(score);
  return score;
}
