import { useState } from "react";

interface Props {}

const Loading = ({}: Props) => {
  const [loading, setLoading] = useState(true);

  return <div style={{ backgroundColor: "black" }}></div>;
};

export default Loading;
