import { default as fs } from "fs";
import { default as readline } from "readline";
import { HandShape } from "./handShape.js";
import { HandShapeFactory } from "./handShapeFactory.js";
import { RoundResult } from "./RoundResult.js";
import { RoundResultFactory } from "./RoundResultFactory.js";

export async function rockPaperScissorsScoreCounter(
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let score = 0;

  const handShapeFactory = HandShapeFactory.Instance;

  for await (const line of rl) {
    let opponentActionLetter = line[0];
    let opponentAction = handShapeFactory.createHandShape(opponentActionLetter);

    let yourActionLetter = line[2];
    let yourAction = handShapeFactory.createHandShape(yourActionLetter);

    let roundScore = yourAction.scoreRound(opponentAction);
    score += roundScore;
  }

  console.log(score);
  return score;
}

//Second Method of the part2 of this problem
export async function rockPaperScissorsScoreCounter2(
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let score = 0;

  const handShapeFactory = HandShapeFactory.Instance;
  const roundResultFactory = RoundResultFactory.Instance;

  for await (const line of rl) {
    let opponentActionLetter = line[0];
    let opponentAction: HandShape = handShapeFactory.createHandShape(opponentActionLetter);

    let roundResultLetter = line[2];
    let roundResult : RoundResult = roundResultFactory.createMatchResult(roundResultLetter);

    let yourAction: HandShape = opponentAction.handShapeForResultOpponent(roundResult);
    let roundScore = yourAction.scoreRound(opponentAction);
    score += roundScore;
  }

  console.log(score);
  return score;
}

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/2/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
