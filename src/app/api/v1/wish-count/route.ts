import { NextResponse } from "next/server";
import { getWishCount } from "../utils/getWishCount";
export async function GET() {
  try {
    const count = await getWishCount();
    return NextResponse.json({ count });
  } catch (err) {}

  return NextResponse.json("INTERNAL_SERVER_ERROR");
}
