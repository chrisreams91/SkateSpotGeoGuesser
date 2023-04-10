import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGlobalState } from "../Context";
import http from "@/util/Http";
import { Spot } from "@prisma/client";
import { point, distance } from "@turf/turf";
import { checkeredFlag } from "@/util/svgs";

interface Props {}

export const Map = ({}: Props) => {
  const ref = useRef();
  const [state, dispatch] = useGlobalState();
  const [mapContainerStyle, setMapContainerStyle] = useState("map-container");
  // need to force rerender since mutations to map dont cause it
  const [hasGuessed, setHasGuessed] = useState(false);

  const defaultCenter = { lat: 40.580233, lng: -38.289179 };
  const defaultZoom = 1.5;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center: defaultCenter,
      zoom: defaultZoom,
      fullscreenControl: false,
      streetView: null,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      controlSize: 25,
      zoomControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
    });

    const guessMarker = new google.maps.Marker({
      map,
    });
    // @ts-ignore
    const pos = { lat: state?.spot?.coords.lat, lng: state?.spot?.coords.lng };
    // console.log("pos : ", pos);
    // console.log("state : ", state);

    const actualMarker = new google.maps.Marker({
      map,
      icon: {
        path: checkeredFlag,
        fillColor: "#00008B",
        fillOpacity: 1,
        strokeColor: "#AB47BC",
        scale: 0.05,
        anchor: new google.maps.Point(0, 550),
      },
      // @ts-ignore
      position: { lat: state?.spot?.coords.lat, lng: state?.spot?.coords.lng },
    });

    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 4,
    };
    const line = new google.maps.Polyline({
      map,
      geodesic: true,
      strokeColor: "#00008B",
      strokeOpacity: 0,
      strokeWeight: 2,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "15px",
        },
      ],
    });

    line.setVisible(false);
    guessMarker.setVisible(false);
    actualMarker.setVisible(false);

    dispatch!({
      guessSpotMapMarker: guessMarker,
      actualSpotMarker: actualMarker,
      line: line,
      map,
    });
  }, []);

  // wait for map to load before adding listener
  useEffect(() => {
    state.map?.addListener("click", mapOnClick);
  }, [state.map]);

  const mapOnClick = (event: google.maps.MapMouseEvent) => {
    const { guessSpotMapMarker } = state;
    const updatedCoords = event.latLng?.toJSON();
    setHasGuessed(true);
    guessSpotMapMarker?.setVisible(true);
    guessSpotMapMarker?.setPosition(updatedCoords);
  };

  const confirmSelection = async () => {
    // TODO make map unclickable durign this state

    const {
      spot,
      actualSpotMarker,
      streetView,
      guessSpotMapMarker,
      line,
      map,
    } = state;
    const spotPoint = point([
      //@ts-ignore
      Number(spot?.coords?.lat),
      //@ts-ignore
      Number(spot?.coords?.lng),
    ]);
    const guessPoint = point([
      Number(guessSpotMapMarker?.getPosition()?.lat()),
      Number(guessSpotMapMarker?.getPosition()?.lng()),
    ]);
    const calculatedDistance = distance(spotPoint, guessPoint, {
      units: "miles",
    });

    actualSpotMarker?.setVisible(true);
    line?.setPath([
      // @ts-ignore
      actualSpotMarker?.getPosition(),
      // @ts-ignore
      guessSpotMapMarker?.getPosition(),
    ]);
    line?.setVisible(true);

    setMapContainerStyle("map-results-container");

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(actualSpotMarker?.getPosition()!);
    bounds.extend(guessSpotMapMarker?.getPosition()!);
    map?.setCenter(bounds.getCenter());
    map?.fitBounds(bounds, 0);
    map?.setClickableIcons(false);
    google.maps.event.clearListeners(map!, "click");

    dispatch!({ result: calculatedDistance });

    const body = {
      coords: guessSpotMapMarker?.getPosition()?.toJSON(),
      distanceFromSpot: calculatedDistance,
      pov: streetView?.getPov(),
      spotId: spot?.id,
    };
    await http("/api/guesses", "POST", body);
  };

  const loadNextSpot = async () => {
    const { actualSpotMarker, guessSpotMapMarker, line, map } = state;

    const nextSpot: Spot = await http("/api/spots");
    guessSpotMapMarker?.setVisible(false);
    state.actualSpotMarker?.setVisible(false);
    actualSpotMarker?.setPosition({
      //@ts-ignore
      lat: nextSpot.coords.lat,
      //@ts-ignore
      lng: nextSpot.coords.lng,
    });
    line?.setVisible(false);

    map?.setCenter(defaultCenter);
    map?.setZoom(defaultZoom);
    map?.addListener("click", mapOnClick);

    dispatch!({ spot: nextSpot, result: undefined });
    setMapContainerStyle("map-container");
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
            isDisabled={!hasGuessed}
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
          <Button colorScheme="blue" onClick={loadNextSpot} size={"lg"}>
            Next Spot
          </Button>
        </div>
      )}
    </div>
  );
};

export default Map;
