import { Spot } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import { useGlobalState } from "../Context";

interface Props {
  spot: Spot | undefined;
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
          position: spot.coords,
          zoom: spot.pov?.zoom || 0,
          addressControl: false,
          fullscreenControl: false,
          showRoadLabels: false,
          panControl: false,
          linksControl: false,
          zoomControl: false,
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
