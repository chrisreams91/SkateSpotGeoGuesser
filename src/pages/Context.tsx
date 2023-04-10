import { createContext, useReducer, useContext, Dispatch } from "react";
import { Spot } from "@prisma/client";

interface MapContext {
  map?: google.maps.Map;
  spot?: Spot;
  streetView?: google.maps.StreetViewPanorama;
  guessSpotMapMarker?: google.maps.Marker;
  actualSpotMarker?: google.maps.Marker;
  line?: google.maps.Polyline;
  result?: number;
}

const mapContext = createContext<MapContext>({});
const dispatchContext = createContext<
  Dispatch<Partial<MapContext>> | undefined
>(undefined);

export const useGlobalState = (): [
  MapContext,
  Dispatch<Partial<MapContext>> | undefined
] => [useContext(mapContext), useContext(dispatchContext)];

interface Props {
  children: JSX.Element;
}

const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    (state: MapContext, newValue: Partial<MapContext>) => ({
      ...state,
      ...newValue,
    }),
    {}
  );

  return (
    <mapContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </mapContext.Provider>
  );
};

export default ContextProvider;
