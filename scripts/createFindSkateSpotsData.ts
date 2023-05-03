import { writeFile, readFile } from "fs/promises";
import axios from "axios";
import { Spot } from "@prisma/client";
import _ from "lodash";
import { FindSkateSpotsSpot } from "@/util/Types";

const pinsUrl = `https://findskatespots.com/api/map/pins?ymax=89.83663894356722&xmax=566.7187500000001&ymin=-83.52016238353204&xmin=-479.53125000000006&zoom=0`;

const fetchPinData = async () => {
  console.log("Fetching pin data.");
  const pins: Spot[] = (await axios.get(pinsUrl)).data;
  await writeFile(
    `${process.cwd()}/data/findSkateSpotsPins.json`,
    JSON.stringify(pins)
  );
  console.log("Finished writing pin data.");
};

const fetchSpotsByPage = async () => {
  console.log("Fetching partial spot data.");
  async function* fetchSpotsByPage() {
    let index = 1;
    while (true) {
      const spotData = `https://findskatespots.com/api/spots/from-bounds?ymax=89.83663894356722&xmax=566.7187500000001&ymin=-83.52016238353204&xmin=-479.53125000000006&page=${index}&pageSize=500&sortBy=popularity`;
      const res = await axios.get(spotData);
      console.log("loop : ", index);
      index++;
      yield Object.values(res.data.items);
    }
  }
  const spots: any[] = [];
  for await (const result of fetchSpotsByPage()) {
    if (result.length === 0) {
      break;
    } else {
      spots.push(...result);
    }
  }
  await writeFile(
    `${process.cwd()}/data/findSkateSpotsSpots.json`,
    JSON.stringify(spots)
  );
  console.log("Finished writing partial spot data.");
};

const buildFullSpots = async () => {
  console.log("Fetching Full Spot Data");
  const alreadyFetchedSpots = await readFile(
    `${process.cwd()}/data/findSkateSpotsSpots.json`,
    {
      encoding: "utf8",
    }
  );
  const stoppingPlace: FindSkateSpotsSpot[] = JSON.parse(alreadyFetchedSpots);

  const failures = [];
  let fullSpots = [];
  let i = 0;

  for (const spot of _.drop(stoppingPlace, i)) {
    const url = `https://findskatespots.com/spots/${spot.location.slug}/${spot.slug}`;
    try {
      const res = await axios.get(url);

      const nextDataIndex = res.data.indexOf("__NEXT_DATA__");
      const propsStartIndex = nextDataIndex + 39;
      const chopped = res.data.substring(propsStartIndex);
      const propsEndIndex = chopped.indexOf("</script>");
      const nextDataProps = JSON.parse(chopped.substring(0, propsEndIndex));

      const mergedEntity = {
        ...nextDataProps.props.pageProps.initialState.spots.spot,
        url,
        videoCount: spot.videoCount,
        photoCount: spot.photoCount,
      };
      fullSpots.push(mergedEntity);
      console.log(i);
      i++;
      if (i % 100 === 0) {
        await writeChunkToFile(fullSpots);
        fullSpots = [];
      }
    } catch (error) {
      failures.push(url);
      console.log(error);
    }
  }

  await writeChunkToFile(fullSpots);
  console.log("Failures: ", failures);
  console.log("Finished writing all spot data");
};

const writeChunkToFile = async (chunk: Spot[]) => {
  const currentSpots = await readFile(
    `${process.cwd()}/data/findSkateSpotsFullEntities.json`,
    {
      encoding: "utf8",
    }
  );

  const parsed = JSON.parse(currentSpots);

  await writeFile(
    `${process.cwd()}/data/findSkateSpotsFullEntities.json`,
    JSON.stringify([...parsed, ...chunk])
  );
  console.log("Wrote chunk to file");
};

const main = async () => {
  // await fetchPinData();
  // await fetchSpotsByPage();
  await buildFullSpots();
};

main();
