import { Spot, Pov } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import { useGlobalState } from "../Context";

interface SpotWithPov extends Spot {
  pov: Pov;
}
interface Props {
  spot: SpotWithPov | undefined;
}

const StreetView = ({ spot }: Props) => {
  const ref = useRef();
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (spot) {
      const streetView = new window.google.maps.StreetViewPanorama(
        // @ts-ignore
        ref.current,
        {
          position: {
            lat: spot.pov.lat,
            lng: spot.pov.long,
          },
          zoom: spot.pov.zoom,
          addressControl: false,
          fullscreenControl: false,
          showRoadLabels: false,
          panControl: false,
          linksControl: false,
          zoomControl: false,
          pov: {
            heading: spot.pov.heading,
            pitch: spot.pov.pitch,
          }
        }
      );
      dispatch!({ streetView: streetView });
    }
  }, [dispatch, spot]);

  return (
    <div
      // @ts-ignore
      ref={ref}
      id="street-view"
      style={{ height: "90vh" }}
    />
  );
};

export default StreetView;
