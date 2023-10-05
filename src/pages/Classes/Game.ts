import { GameMode, SpotType } from "../../util/Types";
import { Guess } from "@prisma/client";

export class Game {
  user: string;
  gameMode: GameMode;
  spotTypes: SpotType;
  guesses: Guess[] = [];
  score: number = 0;
  isCompleted: boolean = false;
  guessLimit: number = 2;

  constructor(user: string, gameMode: GameMode, spotTypes: SpotType) {
    this.user = user;
    this.gameMode = gameMode;
    this.spotTypes = spotTypes;
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
