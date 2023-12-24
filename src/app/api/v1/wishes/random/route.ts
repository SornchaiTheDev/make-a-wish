import { getWishCount } from "../../utils/getWishCount";
import { db } from "../../firebase";
import Chance from "chance";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getWishCount();
  const chance = new Chance();
  const random = chance.integer({ min: 0, max: count - 1 });

  const wishRef = db.collection("wishes").where("index", "==", random);
  const wishSnap = await wishRef.get();

  let wishId;
  wishSnap.forEach((doc) => (wishId = doc.id));

  return Response.json(wishId);
}
