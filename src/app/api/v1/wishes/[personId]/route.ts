import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../firebase";
import { TWish } from "~/types/TWish";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { personId: string } }
) {
  const { personId } = params;
  const { lastWish } = await req.json();

  try {
    let wishesDoc;
    wishesDoc = db
      .collection("people")
      .doc(personId)
      .collection("wishes")
      .orderBy("sent_at", "asc")
      .startAfter(lastWish)
      .limit(5);

    const wishesSnap = await wishesDoc.get();

    const _lastWish =
      wishesSnap.docs[wishesSnap.docs.length - 1]?.data().sent_at;

    const wishes: TWish[] = [];
    wishesSnap.forEach((doc) =>
      wishes.push({
        ...(doc.data() as TWish),
        id: doc.id,
      })
    );

    return Response.json({
      wishes,
      lastWish: _lastWish === undefined ? lastWish : _lastWish,
    });
  } catch (err) {
    console.log(err);
    return Response.json(null);
  }
}

type Reaction = {
  reaction: "love" | "laugh" | "candy";
};

export async function PUT(
  req: Request,
  { params }: { params: { wishId: string } }
) {
  const res: Reaction = await req.json();
  const { reaction } = res;
  const { wishId } = params;
  const docRef = db.doc(`wishes/${wishId}`);
  try {
    await docRef.update({
      [reaction]: FieldValue.increment(1),
    });
  } catch (err) {
    return Response.error();
  }

  return Response.json("OK");
}
