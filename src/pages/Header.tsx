import { point, distance } from "@turf/turf";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Spot } from "@prisma/client";
import { Coords } from "./Types";
import { useGlobalState } from "./Context";

interface Props {
  spot: Spot | undefined;
  guess: Coords | undefined;
}

const Header = ({ spot, guess }: Props) => {
  const [result, setResult] = useState<Number>();
  const [spotVotedToRemove, setSpotVotedToRemove] = useState(false);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (guess) {
      //@ts-ignore
      const spotPoint = point([spot.coords.lat, spot.coords.lng]);
      const guessPoint = point([guess.lat || 0, guess.lng || 0]);
      const calculatedDistance = distance(spotPoint, guessPoint, {
        units: "miles",
      });

      setResult(calculatedDistance);
    }
  }, [guess]);

  const voteToRemoveSpot = async () => {
    const response = await fetch("/api/spots", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spot),
    });
    setSpotVotedToRemove(true);
    const json = await response.json();
  };

  const suggestSpotPov = async () => {
    console.log(state);
    if (state.streetView) {
      console.log(state.streetView.getPosition());
      console.log(state.streetView.getPov().heading);
      console.log(state.streetView.getPov().pitch);
    }

    // const response = await fetch("/api/spots", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(spot),
    // });
    // console.log("suggestSpotPov");
  };

  const resultText = result ? `${result?.toString()} Miles` : "NA";
  const guessText = guess ? `${guess?.lat},${guess?.lng}` : "NA";
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
      {spot && (
        <>
          <div>
            <div>Current Guess = {guessText}</div>
            <div>Distance away = {resultText}</div>
            <div>Score = TBD</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ButtonGroup>
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
