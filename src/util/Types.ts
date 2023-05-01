export interface Pov extends google.maps.StreetViewPov {
  zoom: number;
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
