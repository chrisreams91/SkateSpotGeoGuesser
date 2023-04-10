import { point, distance } from "@turf/turf";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Spot } from "@prisma/client";
import { Coords, Tag } from "../util/Types";
import { useGlobalState } from "./Context";
import http from "../util/Http";

interface Props {}

const Loading = ({}: Props) => {
  const [loading, setLoading] = useState(true);

  return <div style={{ backgroundColor: "black" }}></div>;
};

export default Loading;
