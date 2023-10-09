import { Spot, Pov } from "@prisma/client";
export interface SpotWithPov extends Spot {
  pov: Pov;
}

export enum Tag {
  NOT_UNITED_STATES = "NOT_UNITED_STATES",
  FAMOUS = "FAMOUS",
  REMOVE = "REMOVE",
  EUROPE = "EUROPE",
  STL_AREA = "STL_AREA",
  POPULAR = "POPULAR",
  ALL = "ALL",
}

export enum SpotType {
  NOT_UNITED_STATES = "NOT_UNITED_STATES",
  FAMOUS = "FAMOUS",
  REMOVE = "REMOVE",
  EUROPE = "EUROPE",
  STL_AREA = "STL_AREA",
  POPULAR = "POPULAR",
  ALL = "ALL",
}

export enum GameType {
  FREEPLAY = "FREEPLAY",
  SCORED_ROUNDS = "SCORED_ROUNDS",
  TIMED_ROUNDS = "TIMED_ROUNDS",
}

// EXTERNAL
export interface FullEntity extends ExternalSpot {
  id: number;
  title: string;
  description: string;
  slug: string;
  shortId: string;
  streetNumber: string;
  streetName: string;
  postalCode: string;
  formattedAddress: string;
  geohash: string;
  area: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  photos: any[];
}

export interface ExternalSpot {
  videoCount: string;
  photoCount: string;
  slug: string;
  location: {
    slug: string;
    city: string;
    state: string;
    stateShort: string;
    country: string;
  };
}
