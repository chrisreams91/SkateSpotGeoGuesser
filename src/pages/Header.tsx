import { lineString, length, point, distance } from "@turf/turf";
import { useEffect, useState } from "react";
interface Props {
  spot: { lat: number; lng: number };
  guess: google.maps.Marker | undefined;
}

const Header = ({ spot, guess }: Props) => {
  const [result, setResult] = useState<Number>();
  useEffect(() => {
    if (guess) {
      const spotPoint = point([spot.lat, spot.lng]);
      const guessPoint = point([
        guess.getPosition()?.lat() || 0,
        guess.getPosition()?.lng() || 0,
      ]);
      const calculatedDistance = distance(spotPoint, guessPoint, {
        units: "miles",
      });

      setResult(calculatedDistance);
    }
  }, [guess]);

  const resultText = result ? `${result?.toString()} Miles` : "NA";

  return (
    <div style={{ color: "white", backgroundColor: "black", height: "10vh" }}>
      <div>
        Current Spot Location = ({spot?.lat}, {spot?.lng})
      </div>
      <div>Current Guess = {guess?.getPosition()?.toString()}</div>
      <div>Distance away = {resultText}</div>
    </div>
  );
};

export default Header;
