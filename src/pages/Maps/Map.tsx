import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  setGuess: React.Dispatch<
    React.SetStateAction<google.maps.Marker | undefined>
  >;
}

export const Map = ({ setGuess }: Props) => {
  const ref = useRef();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const center = { lat: 40.580233, lng: -38.289179 };
    const zoom = 2;

    // @ts-ignore
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      fullscreenControl: false,
      streetView: false,
      streetViewControl: false,
      mapTypeControl: false,
    });

    const newMarker = new google.maps.Marker({
      map,
    });

    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      updateMarker(newMarker, event.latLng!);
    });

    setMarker(newMarker);
  }, []);

  function updateMarker(
    marker: google.maps.Marker,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    marker.setPosition(position);
    setMarker(marker);
    setCanSubmit(true);
  }

  const confirmSelection = () => {
    console.log(marker?.getPosition()?.toString());
    setGuess(marker);
  };

  return (
    <div
      id="map-container"
      style={{
        zIndex: 5,
        position: "absolute",
        bottom: 60,
        right: 20,
        opacity: 1,
      }}
    >
      <div
        // @ts-ignore
        ref={ref}
        id="map"
      />
      <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
        <Button
          colorScheme="blue"
          onClick={confirmSelection}
          isDisabled={!canSubmit}
          width={"40"}
          height={"8"}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Map;
