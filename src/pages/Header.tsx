import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag } from "../util/Types";
import { useGlobalState } from "./Context";
import http from "../util/Http";

interface Props {}

const Header = ({}: Props) => {
  const [spotVotedToRemove, setSpotVotedToRemove] = useState(false);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    setSpotVotedToRemove(false);
  }, [state.spot]);

  const tagAsFamous = async () => {
    const { spot } = state;

    await http(`/api/spots/${spot?.id}/addTags`, "PUT", Tag.FAMOUS);
  };

  const tagAsCool = async () => {
    const { spot } = state;

    await http(`/api/spots/${spot?.id}/addTags`, "PUT", Tag.COOL);
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
        zoom: streetView.getZoom(),
      };
      await http(`/api/spots/${spot?.id}/suggestPov`, "PUT", suggestion);
    }
  };

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
      <div>Skate Spot GeoGuesser</div>

      {state.spot && (
        <>
          <div style={{ margin: "auto" }}>
            {state.result && (
              <div style={{ fontSize: 20 }}>
                Result: {state.result?.toFixed(2).toString()} Miles
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ButtonGroup>
              {/* <Button colorScheme="blue" onClick={tagAsFamous}>
                Tag as famous
              </Button> */}
              <Button colorScheme="blue" onClick={tagAsCool}>
                Tag as cool
              </Button>
              <Button colorScheme="blue" onClick={suggestSpotPov}>
                Suggest POV
              </Button>
              <Button
                colorScheme="blue"
                onClick={voteToRemoveSpot}
                isDisabled={spotVotedToRemove}
              >
                Remove Spot
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
