import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    new window.google.maps.StreetViewPanorama(ref.current, {
      position: center,
      zoom,
      //   pov: {
      //     heading: 34,
      //     pitch: 10,
      //   },
    });
  });

  return (
    // @ts-ignore
    <div ref={ref} id="map" style={{ height: 600, width: 600, margin: 40 }} />
  );
}

const StreetView = () => {
  const macba = { lat: 41.382986, lng: 2.167269 };
  const zoom = 0;

  return (
    <Wrapper apiKey={API_KEY || ""} render={render}>
      <MyMapComponent center={macba} zoom={zoom} />
    </Wrapper>
  );
};

export default StreetView;
