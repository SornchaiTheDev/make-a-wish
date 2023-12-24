import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../firebase";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { wishId: string } }
) {
  const { wishId } = params;
  const docRef = db.doc(`wishes/${wishId}`);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return NextResponse.json(docSnap.data());
  }

  return NextResponse.json("NOT_FOUND");
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
    return NextResponse.error();
  }

  return NextResponse.json("OK");
}
