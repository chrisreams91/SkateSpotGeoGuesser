import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loadingMap from "../util/animations/99546-loupe-on-map.json";

interface Props {}

const Loading = ({}: Props) => {
  const [loading, setLoading] = useState(true);
  return <Lottie animationData={loadingMap} />;
};

export default Loading;
