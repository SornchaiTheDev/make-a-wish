import { NextResponse } from "next/server";
import { getWishCount } from "../../utils/getWishCount";
import { db } from "../../firebase";

export async function GET() {
  const count = await getWishCount();
  const random = Math.max(Math.floor(Math.random() * count), 0);
  const wish = await db.collection("wishes").where("index", "==", random).get();
  if (wish.empty) {
    return NextResponse.error();
  }
  let wishId = "";
  wish.forEach((doc) => (wishId = doc.id));

  return NextResponse.json(wishId);
}
