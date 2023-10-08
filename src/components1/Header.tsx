import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Center,
  Text,
  Table,
  Box,
} from "@chakra-ui/react";
import { useGlobalState } from "../pages/Context";
import http from "@/util/Http1";
import { Tag } from "@/util/Types1";

interface Props {}

const Header = ({}: Props) => {
  const [spotVotedToRemove, setSpotVotedToRemove] = useState(false);
  const [state, dispatch] = useGlobalState();

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
    <Box
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
      <Center>
        <Heading>Skatespot GeoGuesser</Heading>
      </Center>
      {state.spot && state.game && !state.game.isCompleted && (
        <>
          {state.result && (
            <Center>
              <Text fontSize="2xl">
                Result: {state.result?.toFixed(2).toString()} Miles
              </Text>
            </Center>
          )}
          <Center>
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
          </Center>
        </>
      )}
    </Box>
  );
};

export default Header;
