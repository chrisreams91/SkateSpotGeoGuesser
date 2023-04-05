import { lineString, length, point, distance } from "@turf/turf";
import { useEffect, useState } from "react";
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

  const resultText = result ? `${result?.toString()} Miles` : "NA";
  const guessText = guess ? `${guess?.lat},${guess?.lng}` : "NA";
  return (
    <div style={{ color: "white", backgroundColor: "black", height: "10vh" }}>
      <div>Current Guess = {guessText}</div>
      <div>Distance away = {resultText}</div>
      <div>Score = TBD</div>
    </div>
  );
};

export default Header;
