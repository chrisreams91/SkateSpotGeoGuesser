import Lottie from "lottie-react";
import bearFishing404 from "../util/animations/bearFishing404.json";

const custom404 = () => {
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
      <Lottie animationData={bearFishing404} width={"100%"} height={"100%"} />
    </div>
  );
};

export default custom404;
