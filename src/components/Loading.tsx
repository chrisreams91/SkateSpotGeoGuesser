import { useState } from "react";
import { Box } from "@chakra-ui/react";
interface Props {}

const Loading = ({}: Props) => {
  const [loading, setLoading] = useState(true);

  return <Box style={{ backgroundColor: "black" }}></Box>;
};

export default Loading;
