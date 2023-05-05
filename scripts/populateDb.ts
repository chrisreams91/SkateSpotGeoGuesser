import { PrismaClient } from "@prisma/client";
import fullEntities from "../data/findSkateSpotsFullEntities.json";
import { FindSkateSpotsFullEntity, Tag } from "../src/util/Types";

const prisma = new PrismaClient();

const main = async () => {
  const findSkateSpotsEntities = fullEntities as FindSkateSpotsFullEntity[];
  for (const entity of findSkateSpotsEntities) {
    const popularity = Number(entity.videoCount) + Number(entity.photoCount);
    await prisma.spot.create({
      data: {
        source: "findskatespots",
        sourceId: entity.shortId,
        name: entity.title,
        coords: { lat: entity.latitude, lng: entity.longitude },
        ...(popularity > 25 && { tags: [Tag.POPULAR] }),
        //@ts-ignore
        metadata: entity,
      },
    });
  }
};

main();
