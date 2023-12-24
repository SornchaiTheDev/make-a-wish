import { db } from "../firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  const res = await req.json();
  const { from, body } = res;
  const wishDoc = {
    from,
    body,
    love: 0,
    laugh: 0,
    candy: 0,
    index: 0,
  };

  try {
    const wishCountRef = db.collection("counts").doc("uByQZnEh0JWTosVtsY4Q");
    await db.runTransaction(async (transaction) => {
      const wishCount = await transaction.get(wishCountRef);
      if (!wishCount.exists) {
        throw "Document does not exist!";
      }
      wishDoc.index = wishCount.data()!.amount;
      await transaction.update(wishCountRef, {
        amount: FieldValue.increment(1),
      });
    });

    const wish = await db.collection("wishes").add(wishDoc);

    return Response.json(wish.id);
  } catch (err) {
    return Response.error();
  }
}
