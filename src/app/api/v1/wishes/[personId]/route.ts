import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../firebase";
import { TWish } from "~/types/TWish";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST(
    req: Request,
    { params }: { params: { personId: string } }
) {
    const { personId } = params;
    const { lastWish, token } = await req.json();

    if (!token) {
        return Response.json({
            error: "กรุณาลองใหม่อีกครั้ง",
        });
    }

    let userId: any = null;

    try {
        userId = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        return Response.error();
    }

    if (userId.data !== personId) {
        return Response.error();
    }

    try {
        const personRef = db.collection("people").doc(personId);
        const personSnap = await personRef.get();

        if (!personSnap.exists) {
            return Response.error();
        }

        const wishesDoc = db
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
            person: personSnap.data(),
            wishes,
            lastWish: _lastWish === undefined ? lastWish : _lastWish,
        });
    } catch (err) {
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
