import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import _ from "lodash";
import StreetView from "./Maps/StreetView";
import Map from "./Maps/Map";
import Header from "./Header";
import { Spot, Pov } from "@prisma/client";
import { useGlobalState } from "./Context";
import http from "../util/Http";
import GameSelect from "./Menus/GameSelect";
import { Game } from "./Classes/Game";

interface SpotWithPov extends Spot {
  pov: Pov;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [gameStarted, setGameStarted] = useState(true);

  useEffect(() => {
    // TODO why is this running twice ( i think it was some local only bug i read some where)
    interface SpotWithPov extends Spot {
      pov: Pov;
    }

    const fetchSpot = async () => {
      const spot: SpotWithPov = await http("/api/spots");
      console.log(spot);
      dispatch!({ spot });
    };

    fetchSpot();
  }, []);

  const startGame = async (game: Game) => {
    const spot: SpotWithPov = await http("/api/spots");
    console.log(spot);
    dispatch!({ spot, game });
    setGameStarted(true);
  };

  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Wrapper apiKey={API_KEY || ""} render={render}>
        {/* {useMemo(
          () => (
            <StreetView spot={state.spot} />
          ),
          [state.spot]
        )} */}
        <GameSelect gameStarted={gameStarted} setGameStarted={startGame} />

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
