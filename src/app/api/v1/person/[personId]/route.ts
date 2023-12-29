import { db } from "../../firebase";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: { personId: string } }
) {
  const { personId } = params;

  const personRef = db.collection("people").doc(personId);
  const personSnap = await personRef.get();

  if (!personSnap.exists) {
    return Response.error();
  }

  const person = personSnap.data();

  return Response.json({ username: person?.username });
}
