export interface Coords {
  lat: number;
  lng: number;
}

export interface SpotView {
  pov: google.maps.StreetViewPov;
  zoom: number;
}

export interface Spot {
  id: string;
  source: string;
  sourceId?: string;
  coords: Coords;
  name?: string;
  spotView: SpotView;
  votesToRemoveFromPool: number;
  suggestedPovs: SpotView[];
  zoom: number;
}

export interface Guess {
  id: string;
  spotId: string;
  guessCoords: Coords;
  date: string;
  distanceFromSpot: string;
  povOfGuess: SpotView;
  score: number;
}

export interface User {
  id: string;
  name: string;
  createdDate: string;
  lastActive: string;
  guessCount: number;
  guesses: Guess[];
}

//
//
// EXTERNAL
//
//
export interface findSkateSpotsSpot {
  lat: number;
  lng: number;
  key: string;
  spotcount: string;
  shortId: string;
}
