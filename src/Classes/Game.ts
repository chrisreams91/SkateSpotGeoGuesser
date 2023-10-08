import { GameType, SpotType } from "../util/Types";
import { Guess } from "@prisma/client";

export class Game {
  user: string;
  gameType: GameType;
  spotType: SpotType;
  guesses: Guess[] = [];
  score: number = 0;
  isCompleted: boolean = false;
  guessLimit: number = 2;

  constructor(user: string, gameType: GameType, spotType: SpotType) {
    this.user = user;
    this.gameType = gameType;
    this.spotType = spotType;
  }

  addGuess(guess: Guess) {
    this.guesses.push(guess);

    if (this.guesses.length === this.guessLimit ){ 
      this.calculateScoreForGame()
      this.isCompleted = true;
    }
  }

  calculateScoreForGame() {
    this.score = this.guesses.reduce((acc, guess) => {
      return acc + guess.score;
    }, 0);
  }
}
