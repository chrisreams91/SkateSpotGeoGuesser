import { Game } from "@prisma/client";

interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type IGame = Omit<Game, keyof BaseEntity> & {
  isCompleted: boolean;
}; 

//
// ENUMS
//
export enum Tag {
  FAMOUS = "FAMOUS",
  COOL = "COOL",
  POPULAR = "POPULAR",
  REMOVE = "REMOVE",
}

export enum GameMode {
  FREEPLAY = "FREEPLAY",
  SCORED_ROUNDS = "SCORED_ROUNDS",
  TIMED_ROUNDS = "TIMED_ROUNDS",
}

export enum SpotType {
  POPULAR = "POPULAR",
  ALL = "ALL",
}

//
// EXTERNAL
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
