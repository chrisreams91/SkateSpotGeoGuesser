export interface Pov extends google.maps.StreetViewPov {
  zoom: number;
}

export enum Tag {
  FAMOUS = "FAMOUS",
  COOL = "COOL",
  POPULAR = "POPULAR",
}

export enum GameType {
  FREEPLAY = "FREEPLAY",
  SCORED_ROUNDS = "SCORED_ROUNDS",
  TIMED_ROUNDS = "TIMED_ROUNDS",
}

export enum SpotType {
  POPULAR = "POPULAR",
  ALL = "ALL",
}

export interface Game {
  user: User;
  gameType: GameType;
  spotTypes: SpotType;
  guesses: Guess[];
  score: number;
}

export interface Guess {}

export interface User {
  name: string;
}

//
//
// EXTERNAL
//
//
export interface FindSkateSpotsFullEntity extends FindSkateSpotsSpot {
  id: number;
  title: string;
  description: string;
  slug: string;
  shortId: string;
  streetNumber: string;
  streetName: string;
  postalCode: string;
  formattedAddress: string;
  area: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  photos: any[];
}

export interface FindSkateSpotsSpot {
  videoCount: string;
  photoCount: string;
  slug: string;
  location: {
    slug: string;
    city: string;
    state: string;
  };
}
