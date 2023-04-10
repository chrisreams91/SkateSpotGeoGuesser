import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import _ from "lodash";
import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";
import { Spot } from "@prisma/client";
import ContextProvider from "./Context";
import http from "../util/Http";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const [spot, setSpot] = useState<Spot>();

  useEffect(() => {
    // TODO why is this running twice
    const fetchSpot = async () => {
      const spot: Spot = await http("/api/spots");

      setSpot(spot);
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
          <Map />
        </Wrapper>
      </ContextProvider>
    </>
  );
};

export default Home;
