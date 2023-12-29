import bcrypt from "bcrypt";
import { db } from "../firebase";
import jwt from "jsonwebtoken";
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
        const token = jwt.sign(
            {
                data: personSnap.docs[0].id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h",
            }
        );
        return Response.json({
            id: personSnap.docs[0].id,
            token,
        });
    }

    return Response.error();
}
