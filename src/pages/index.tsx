import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import _ from "lodash";
import StreetView from "./Game/Maps/StreetView";
import Map from "./Game/Maps/Map";
import Header from "../Components/Header";
import { useGlobalState } from "./Context";
import http from "../util/Http";
import Menu from "./Menu/Menu";
import { SpotWithPov } from "@/util/Types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Home = () => {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    // TODO why is this running twice ( i think it was some local only bug i read some where)

    const fetchSpot = async () => {
      const spot: SpotWithPov = await http("/api/spots");
      dispatch!({ spot });
    };

    fetchSpot();
  }, []);

  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Menu />
      <Wrapper apiKey={API_KEY || ""} render={render}>
        {state.spot && state.game && !state.game.isCompleted && (
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
