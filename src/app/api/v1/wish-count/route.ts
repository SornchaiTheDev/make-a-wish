import { getWishCount } from "../utils/getWishCount";
export async function GET(_: Request) {
  try {
    const count = await getWishCount();
    return Response.json({ count });
  } catch (err) {}

  return Response.json("INTERNAL_SERVER_ERROR");
}
