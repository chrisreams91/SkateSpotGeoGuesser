import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ContextProvider from "./Context";
import { Pov } from "@/util/Types";

declare global {
  namespace PrismaJson {
    type LatLngLiteral = google.maps.LatLngLiteral;
    type IPov = Pov;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  );
}
