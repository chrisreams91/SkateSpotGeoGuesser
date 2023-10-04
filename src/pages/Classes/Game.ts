import { GameType, SpotType, Guess } from "@/util/Types";

export class Game {
  user: string;
  gameType: GameType;
  spotTypes: SpotType;
  guesses: Guess[] = [];
  score = 0;

  constructor(user: string, gameType: GameType, spotTypes: SpotType) {
    this.user = user;
    this.gameType = gameType;
    this.spotTypes = spotTypes;
  }

  addGuess(guess: Guess) {
    const scoreForGuess = this.calculateScoreForGuess(guess);
    this.score += scoreForGuess;
    this.guesses.push(guess);
  }

  calculateScoreForGuess(guess: Guess) {
    return 1;
  }
}
