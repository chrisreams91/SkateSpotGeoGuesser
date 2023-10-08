import React, { useEffect, useRef } from "react";
import { useGlobalState } from "../../Context";
import { Box } from "@chakra-ui/react";
import { SpotWithPov } from "@/util/Types";

interface Props {}

const StreetView = ({}: Props) => {
  const ref = useRef();
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (state.spot) {
      const { spot } = state;
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
          },
        }
      );
      dispatch!({ streetView: streetView });
    }
  }, [dispatch, state.spot]);

  return (
    <Box
      // @ts-ignore
      ref={ref}
      id="street-view"
      height={"90vh"}
    />
  );
};

export default StreetView;
