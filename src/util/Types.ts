export interface SpotView {
  pov: google.maps.StreetViewPov;
  zoom: number;
  heading: number;
}

export enum Tag {
  FAMOUS = "FAMOUS",
  COOL = "COOL",
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
