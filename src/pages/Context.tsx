import { createContext, useState, useReducer, useContext } from "react";

interface MapContext {
  map?: google.maps.Map;
  streetView?: google.maps.StreetViewPanorama;
}

const mapContext = createContext<MapContext>({});
const dispatchContext = createContext<any>(undefined);

export const useGlobalState = () => [
  useContext(mapContext),
  useContext(dispatchContext),
];

interface Props {
  children: JSX.Element[];
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
