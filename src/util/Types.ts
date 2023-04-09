export interface Coords {
  lat: number;
  lng: number;
}

export interface SpotView {
  pov: google.maps.StreetViewPov;
  zoom: number;
}

export enum Tag {
  FAMOUS = "FAMOUS",
}

//
//
// EXTERNAL
//
//
export interface FindSkateSpotsSpot {
  lat: number;
  lng: number;
  key: string;
  spotcount: string;
  shortId: string;
}
