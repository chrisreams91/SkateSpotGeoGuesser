import React, {
  useEffect,
  useRef,
  ReactElement,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Props {
  setGuess: React.Dispatch<
    React.SetStateAction<google.maps.Marker | undefined>
  >;
}

export const Map = ({ setGuess }: Props) => {
  const ref = useRef();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    const center = { lat: 40.580233, lng: -38.289179 };
    const zoom = 2;

    // @ts-ignore
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    setMap(map);
  }, []);

  useEffect(() => {
    map?.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (marker) {
        marker.setPosition(event.latLng);
        setGuess(marker);
      } else {
        const newMarker = new google.maps.Marker({
          position: event.latLng,
          map,
        });

        setMarker(newMarker);
        setGuess(newMarker);
      }
    });
  }, [map, marker]);

  return (
    <div
      // @ts-ignore
      ref={ref}
      id="map"
      style={{ height: 600, width: 600 }}
    />
  );
};

export default Map;
