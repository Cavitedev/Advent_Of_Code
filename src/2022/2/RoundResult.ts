export abstract class RoundResult {
  abstract Score: number;
}

export class WinRoundResult extends RoundResult {
  Score: number = 6;
}

export class DrawRoundResult extends RoundResult {
  Score: number = 3;
}

export class LoseRoundResult extends RoundResult {
  Score: number = 0;
}
