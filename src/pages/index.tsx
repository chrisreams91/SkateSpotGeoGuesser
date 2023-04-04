import Head from "next/head";
import styles from "@/styles/Home.module.css";
import StreetView from "./StreetView";

export default function Home() {
  return (
    <>
      <Head>
        <title>Skate Spot GeoGuesser</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StreetView />
    </>
  );
}
