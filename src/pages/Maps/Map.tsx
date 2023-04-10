import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGlobalState } from "../Context";

interface Props {}

export const Map = ({}: Props) => {
  const ref = useRef();
  const [state, dispatch] = useGlobalState();
  const [mapStyle, setMapStyle] = useState("map");
  const [mapContainerStyle, setMapContainerStyle] = useState("map-container");

  useEffect(() => {
    const center = { lat: 40.580233, lng: -38.289179 };
    const zoom = 1.5;

    // @ts-ignore
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      fullscreenControl: false,
      streetView: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      controlSize: 25,
      zoomControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
    });

    const marker = new google.maps.Marker({
      map,
    });

    dispatch!({ mapMarkerCoords: marker.getPosition()?.toJSON() });

    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      const updatedCoords = event.latLng?.toJSON();

      marker.setPosition(updatedCoords);
      dispatch!({ mapMarkerCoords: updatedCoords });
    });
  }, []);

  const confirmSelection = () => {
    setMapStyle("map-results");
    setMapContainerStyle("map-results-container");
    console.log(state);
    // setGuess(marker?.getPosition()?.toJSON());
  };

  const loadNextSpot = () => {
    console.log(state);
  };

  return (
    <div
      // can i do all styles including on hover in code?
      id={mapContainerStyle}
      style={
        mapContainerStyle == "map-results-container"
          ? {
              zIndex: 5,
              position: "absolute",
              top: "10vh",
              width: "100%",
            }
          : {
              zIndex: 5,
              position: "absolute",
              bottom: 60,
              right: 20,
            }
      }
    >
      <div
        // @ts-ignore
        ref={ref}
        id="map"
      />
      {mapContainerStyle == "map-container" ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
          <Button
            colorScheme="blue"
            onClick={confirmSelection}
            isDisabled={!state.mapMarkerCoords}
            width={"40"}
            height={"8"}
          >
            Confirm
          </Button>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Button
            colorScheme="blue"
            onClick={loadNextSpot}
            width={"40"}
            height={"8"}
          >
            Next Spot
          </Button>
        </div>
      )}
    </div>
  );
};

export default Map;
