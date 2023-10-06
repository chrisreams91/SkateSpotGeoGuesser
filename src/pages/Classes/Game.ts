import { GameType, SpotType } from "../../util/Types";
import { Guess } from "@prisma/client";

export class Game {
  user: string;
  gameType: GameType;
  spotType: SpotType;
  guesses: Guess[] = [];
  score: number = 0;
  isCompleted: boolean = false;
  guessLimit: number = 1;

  constructor(user: string, gameType: GameType, spotType: SpotType) {
    this.user = user;
    this.gameType = gameType;
    this.spotType = spotType;
  }

  addGuess(guess: Guess) {
    const scoreForGuess = this.calculateScoreForGuess(guess);
    this.score += scoreForGuess;
    this.guesses.push(guess);

    if (this.guesses.length === this.guessLimit ){ 
      this.calculateScoreForGame()
      this.isCompleted = true;
    }
  }

  calculateScoreForGuess(guess: Guess) {
    return guess.distanceFromSpot;
  }

  calculateScoreForGame() {
    this.score = this.guesses.reduce((acc, guess) => {
      return acc + guess.distanceFromSpot;
    }, 0);
  }
}
