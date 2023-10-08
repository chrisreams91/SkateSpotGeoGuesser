import React, { useEffect, useRef, useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useGlobalState } from "../../Context";
import http from "@/util/Http";
import { point, distance } from "@turf/turf";
import { checkeredFlag } from "@/util/Svgs";
import {
  calculateScoreForGuessPrecise,
  calculateScoreForGuessRough,
} from "@/util/Scoring";
import { SpotWithPov } from "@/util/Types";

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
      position: { lat: state?.spot?.pov?.lat!, lng: state?.spot?.pov?.long! },
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
    const {
      spot,
      actualSpotMarker,
      streetView,
      guessSpotMapMarker,
      line,
      map,
    } = state;
    const spotPoint = point([Number(spot?.pov?.lat), Number(spot?.pov?.long)]);
    const guessPoint = point([
      Number(guessSpotMapMarker?.getPosition()?.lat()),
      Number(guessSpotMapMarker?.getPosition()?.lng()),
    ]);
    const calculatedDistance = distance(spotPoint, guessPoint, {
      units: "miles",
    });
    const roundedNumber = Math.round(calculatedDistance * 100) / 100;

    actualSpotMarker?.setVisible(true);
    line?.setPath([
      actualSpotMarker?.getPosition()!,
      guessSpotMapMarker?.getPosition()!,
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

    dispatch!({ result: roundedNumber });

    const scoreForGuess = calculateScoreForGuessPrecise(roundedNumber);
    const rough = calculateScoreForGuessRough(roundedNumber);
    console.log("distance away in miles : ", roundedNumber);
    console.log("precise : ", scoreForGuess);
    console.log("rough : ", rough);

    const body = {
      distanceFromSpot: roundedNumber,
      score: scoreForGuess,
      pov: {
        lat: guessSpotMapMarker?.getPosition()?.lat(),
        long: guessSpotMapMarker?.getPosition()?.lng(),
        ...streetView?.getPov(),
      },
      spotId: spot?.id,
    };
    const guessResult = await http("/api/guesses", "POST", body);
    state.game?.addGuess(guessResult);
  };

  const loadNextSpot = async () => {
    const { actualSpotMarker, guessSpotMapMarker, line, map, game } = state;

    const nextSpot: SpotWithPov = await http(
      "/api/spots?spotType=" + game?.spotType
    );

    guessSpotMapMarker?.setVisible(false);
    setHasGuessed(false);
    state.actualSpotMarker?.setVisible(false);
    actualSpotMarker?.setPosition({
      lat: nextSpot.pov.lat,
      lng: nextSpot.pov.long,
    });
    line?.setVisible(false);

    map?.setCenter(defaultCenter);
    map?.setZoom(defaultZoom);
    map?.addListener("click", mapOnClick);

    dispatch!({ spot: nextSpot, result: undefined });
    console.log("next spot : ", nextSpot);
    setMapContainerStyle("map-container");
  };

  const finishGame = async () => {
    const { game } = state;
    await http("/api/games", "POST", game);
    dispatch!({ game, result: undefined, spot: undefined });
  };

  return (
    <Box
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
      <Box
        // @ts-ignore
        ref={ref}
        height={"100%"}
        width={"100%"}
      />
      {mapContainerStyle == "map-container" ? (
        <Box style={{ display: "flex", justifyContent: "center", padding: 5 }}>
          <Button
            colorScheme="blue"
            onClick={confirmSelection}
            isDisabled={!hasGuessed}
            width={"40"}
            height={"8"}
          >
            Confirm
          </Button>
        </Box>
      ) : (
        <Box
          style={{
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {state.game?.guesses.length === state.game?.guessLimit! - 1 ? (
            <Button colorScheme="blue" onClick={finishGame} size={"lg"}>
              Results
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={loadNextSpot} size={"lg"}>
              Next Spot
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Map;
