// import { PrismaClient } from "@prisma/client";
// import stoled from "../data/stoled.json";
// import { FindSkateSpotsSpot } from "@/pages/Types";

// const prisma = new PrismaClient();

// const main = async () => {
//   const findskatespots = stoled as FindSkateSpotsSpot[];

//   for (const spot of findskatespots) {
//     await prisma.spot.create({
//       data: {
//         source: "findskatespots",
//         sourceId: spot.shortId,
//         coords: { lat: spot.lat, lng: spot.lng },
//       },
//     });
//   }
// };

// main();
