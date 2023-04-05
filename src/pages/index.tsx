import React, { ReactElement, useState, useMemo } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import * as _ from "lodash";
import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";
import spots from "../../data/spots.json";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const randomSelection = _.random(0, spots.length - 1);
// const randomSelection = spots.length - 1;

const Home = () => {
  const spot = spots[randomSelection].coords;
  const [guess, setGuess] = useState<{ lat: number; lng: number }>();

  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header guess={guess} spot={spot} />
      <Wrapper apiKey={API_KEY || ""} render={render}>
        {useMemo(
          () => (
            <StreetView spot={spot} />
          ),
          [spot]
        )}
        <Map setGuess={setGuess} />
      </Wrapper>
    </>
  );
};

export default Home;
