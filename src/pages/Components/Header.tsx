import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag } from "../../util/Types";
import { useGlobalState } from "../Context";
import http from "../../util/Http";

interface Props {}

const Header = ({}: Props) => {
  const [spotVotedToRemove, setSpotVotedToRemove] = useState(false);
  const [state, _dispatch] = useGlobalState();

  const updatePov = async () => {
    const { streetView, spot } = state;
    if (streetView) {
      const position = streetView.getPosition();
      const pov = streetView.getPov();

      const spotPov = {
        lat: position?.lat(),
        long: position?.lng(),
        heading: pov.heading,
        pitch: pov.pitch,
        zoom: streetView.getZoom(),
      };

      await http(`/api/spots/${spot?.id}/updatePov`, "PUT", spotPov);
    }
  };

  const addRemoveFromRotationTag = async () => {
    const { spot } = state;

    await http(`/api/spots/${spot?.id}/addTags`, "PUT", Tag.REMOVE);

    setSpotVotedToRemove(true);
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
      <div style={{}}>
        <div style={{ fontSize: 20 }}>Skatespot GeoGuesser</div>
      </div>
      {console.log("state : ", state)}
      {state.spot && state.game && !state.game.isCompleted && (
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
              <Button colorScheme="blue" onClick={updatePov}>
                Update POV
              </Button>
              <Button
                colorScheme="blue"
                onClick={addRemoveFromRotationTag}
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
