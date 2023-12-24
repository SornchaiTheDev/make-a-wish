import { db } from "../firebase";

export const getWishCount = async () => {
  const doc = await db.collection("counts").doc("uByQZnEh0JWTosVtsY4Q").get();
  if (doc.exists) {
    const count = doc.data()!.amount;
    return count;
  }
};
