import bcrypt from "bcrypt";
import { db } from "../firebase";
export async function POST(req: Request) {
  const res = await req.json();

  const { username, password } = res;

  const personRef = db.collection("people").where("username", "==", username);
  const personSnap = await personRef.get();

  const person = personSnap.docs[0].data();

  if (personSnap.empty) {
    return Response.error();
  }

  const result = await bcrypt.compare(password, person.password);

  if (result) {
    return Response.json(personSnap.docs[0].id);
  }

  return Response.error();
}
