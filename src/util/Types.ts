import { Spot, Pov } from "@prisma/client";
export interface SpotWithPov extends Spot {
  pov: Pov;
}

export enum Tag {
  UNITED_STATES = "USA",
  NOT_UNITED_STATES = "Not USA",
  FAMOUS = "Famous",
  STL_AREA = "St. Louis",
  POPULAR = "Popular",
  ALL = "All",
}

export enum SpotType {
  UNITED_STATES = "USA",
  NOT_UNITED_STATES = "Not USA",
  FAMOUS = "Famous",
  STL_AREA = "St. Louis",
  POPULAR = "Popular",
  ALL = "All",
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
