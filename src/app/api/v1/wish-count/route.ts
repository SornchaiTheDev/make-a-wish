import { getWishCount } from "../utils/getWishCount";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getWishCount();
    return Response.json({ count });
  } catch (err) {}

  return Response.json("INTERNAL_SERVER_ERROR");
}
