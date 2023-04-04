import React, {
  useEffect,
  useRef,
  ReactElement,
  useState,
  useMemo,
} from "react";
import Head from "next/head";
// import styles from "@/styles/Home.module.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const macba = { lat: 41.382986, lng: 2.167269 };
  const [guess, setGuess] = useState<google.maps.Marker>();

  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header guess={guess} spot={macba} />
      <div id="wrapperdiv" style={{ display: "flex" }}>
        <Wrapper apiKey={API_KEY || ""} render={render}>
          {useMemo(
            () => (
              <StreetView spot={macba} />
            ),
            []
          )}
          <Map setGuess={setGuess} />
        </Wrapper>
      </div>
    </>
  );
};

export default Home;
