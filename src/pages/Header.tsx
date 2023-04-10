import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag } from "../util/Types";
import { useGlobalState } from "./Context";
import http from "../util/Http";

interface Props {}

const Header = ({}: Props) => {
  const [spotVotedToRemove, setSpotVotedToRemove] = useState(false);
  const [state, dispatch] = useGlobalState();

  const tagAsFamous = async () => {
    const { spot } = state;

    await http(`/api/spots/${spot?.id}/voteToRemove`, "PUT", Tag.FAMOUS);
  };

  const voteToRemoveSpot = async () => {
    const { spot } = state;

    await http(`/api/spots/${spot?.id}/voteToRemove`, "PUT");
    setSpotVotedToRemove(true);
  };

  const suggestSpotPov = async () => {
    const { streetView, spot } = state;
    if (streetView) {
      const position = streetView.getPosition();
      const pov = streetView.getPov();

      const suggestion = {
        lat: position?.lat(),
        lng: position?.lng(),
        heading: pov.heading,
        pitch: pov.pitch,
      };
      await http(`/api/spots/${spot?.id}/suggestPov`, "PUT", suggestion);
    }
  };

  const resultText = state.result ? `${state.result?.toString()} Miles` : "NA";
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "black",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {state.spot && (
        <>
          <div>
            <div>Distance away = {resultText}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ButtonGroup>
              <Button colorScheme="blue" onClick={tagAsFamous}>
                Tag as famous
              </Button>
              <Button colorScheme="blue" onClick={suggestSpotPov}>
                Suggest POV for spot
              </Button>
              <Button
                colorScheme="blue"
                onClick={voteToRemoveSpot}
                isDisabled={spotVotedToRemove}
              >
                Remove Spot From Pool
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
