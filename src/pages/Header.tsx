import { point, distance } from "@turf/turf";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  spot: { lat: number; lng: number };
  guess: { lat: number; lng: number } | undefined;
}

const Header = ({ spot, guess }: Props) => {
  const [result, setResult] = useState<Number>();
  useEffect(() => {
    if (guess) {
      const spotPoint = point([spot.lat, spot.lng]);
      const guessPoint = point([guess.lat || 0, guess.lng || 0]);
      const calculatedDistance = distance(spotPoint, guessPoint, {
        units: "miles",
      });

      setResult(calculatedDistance);
    }
  }, [guess]);

  const voteToRemoveSpot = async () => {
    console.log("voteToRemoveSpot");
  };

  const suggestSpotPov = async () => {
    console.log("suggestSpotPov");
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
          <Button colorScheme="blue" onClick={voteToRemoveSpot}>
            Remove Spot From Pool
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
