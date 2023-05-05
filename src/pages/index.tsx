import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import _ from "lodash";
import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";
import { Spot } from "@prisma/client";
import { useGlobalState } from "./Context";
import http from "../util/Http";
import GameSelect from "./Menus/GameSelect";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchSpot = async () => {
      const spot: Spot = await http("/api/spots");
      console.log(spot);
      dispatch!({ spot });
    };

    fetchSpot();
  }, []);

  return (
    <>
      {/* move this head shit out of here */}
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <GameSelect gameStarted={gameStarted} setGameStarted={setGameStarted} />
      <Wrapper apiKey={API_KEY || ""} render={render}>
        {gameStarted && state.spot && (
          <>
            <StreetView spot={state.spot} />
            <Map />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
