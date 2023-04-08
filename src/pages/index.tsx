import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import * as _ from "lodash";
import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";
import { Spot } from "@prisma/client";
import ContextProvider from "./Context";
import http from "./Http";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const [spot, setSpot] = useState<Spot>();

  useEffect(() => {
    const fetchSpot = async () => {
      const spots: Spot[] = await http("/api/spots");
      const randomSelection = _.random(0, spots.length - 1);

      setSpot(spots[randomSelection]);
    };

    fetchSpot();
  }, []);

  const [guess, setGuess] = useState<{ lat: number; lng: number }>();

  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContextProvider>
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
      </ContextProvider>
    </>
  );
};

export default Home;
