import React, { useEffect, useRef } from "react";

interface Props {
  spot: { lat: number; lng: number };
}

const StreetView = ({ spot }: Props) => {
  const zoom = 0;

  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    new window.google.maps.StreetViewPanorama(ref.current, {
      position: spot,
      zoom,
      addressControl: false,
      fullscreenControl: false,
      showRoadLabels: false,
      // panControl: false,
      linksControl: false,
    });
  });

  return (
    <div
      // @ts-ignore
      ref={ref}
      id="streetview"
      style={{ height: 600, width: 600 }}
    />
  );
};

export default StreetView;
