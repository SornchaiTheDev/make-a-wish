import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../firebase";

export async function GET(
  _: Request,
  { params }: { params: { wishId: string } }
) {
  const { wishId } = params;

  const docRef = db.collection("wishes").doc(wishId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return Response.json(docSnap.data());
  }

  return Response.json("NOT_FOUND");
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
