import {readFileLines} from "../../common/readfileLines.js"
import { HandShapeFactory } from "./handShapeFactory.js";

export async function rockPaperScissorsScoreCounter(
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let score = 0;

  const handShapeFactory = HandShapeFactory.Instance;

  for await (const line of rl) {
    const opponentActionLetter = line[0];
    const opponentAction = handShapeFactory.createHandShape(opponentActionLetter);

    const yourActionLetter = line[2];
    const yourAction = handShapeFactory.createHandShape(yourActionLetter);

    const roundScore = yourAction.scoreRound(opponentAction);
    score += roundScore;
  }

  console.log(score);
  return score;
}

