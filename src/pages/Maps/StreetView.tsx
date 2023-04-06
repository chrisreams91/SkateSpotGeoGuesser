import { Spot } from "@prisma/client";
import React, { useEffect, useRef } from "react";

interface Props {
  spot: Spot | undefined;
}

const StreetView = ({ spot }: Props) => {
  const ref = useRef();

  useEffect(() => {
    if (spot) {
      // @ts-ignore
      new window.google.maps.StreetViewPanorama(ref.current, {
        position: spot.coords,
        zoom: 0,
        addressControl: false,
        fullscreenControl: false,
        showRoadLabels: false,
        panControl: false,
        linksControl: false,
        zoomControl: false,
      });
    }
  }, [spot]);

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
