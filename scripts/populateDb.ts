import { PrismaClient } from "@prisma/client";
// import stoled from "../data/FullEntities.json";
import { FullEntity } from "../src/util/Types";

const prisma = new PrismaClient();

const main = async () => {
  // const skatespots = stoled as FullEntity[];
  const skatespots = [] as FullEntity[];

  for (const spot of skatespots) {
    const { location } = spot;
    await prisma.spot.create({
      data: {
        name: spot.title,
        address: spot.formattedAddress,
        city: location.city,
        state: location.state,
        stateCode: location.stateShort,
        country: location.country,
        geohash: spot.geohash,
        comments: spot.description,
        source: "fss",
        sourceId: spot.shortId,
        mediaCount: Number(spot.photoCount) + Number(spot.videoCount),
        pov: {
          create: {
            lat: spot.latitude,
            long: spot.longitude,
            heading: 0,
            pitch: 0,
            zoom: 1,
          },
        },
      },
    });
  }
};

main();
