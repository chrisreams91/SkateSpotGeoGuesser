import Lottie from "lottie-react";
import serverOnForklift from "../util/animations/serverOnForklift.json";

const custom500 = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Lottie animationData={serverOnForklift} width={"100%"} height={"100%"} />
    </div>
  );
};

export default custom500;
