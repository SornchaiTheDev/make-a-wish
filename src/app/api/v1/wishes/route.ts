import { db } from "../firebase";
import { FieldValue } from "firebase-admin/firestore";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import requestIp from "request-ip";
import FormData from "form-data";
import axios from "axios";

const redis = Redis.fromEnv();
const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "10 s"),
});

export async function POST(req: Request) {
    const result = await rateLimiter.limit("api");

    if (!result.success) {
        return Response.json("RATE_LIMIT");
    }

    const res = await req.json();
    const { from, body, token } = res;

    const detectedIp = requestIp.getClientIp(req as any);
    console.log(detectedIp);
    console.log(token)
    
    let formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET!);
    formData.append("response", token);
    // formData.append("remoteip", detectedIp!);
    let { data } = await axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        headers: {
            ...formData.getHeaders(),
        },
        data: formData,
    });

    if (!data.success) {
        return Response.json("ซานตาไม่รับพรคุณ คุณลองใหม่อีกครั้ง");
    }

    const wishDoc = {
        from,
        body,
        love: 0,
        laugh: 0,
        candy: 0,
        index: 0,
    };

    try {
        const wishCountRef = db
            .collection("counts")
            .doc("uByQZnEh0JWTosVtsY4Q");
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

        return Response.json(wish.id, {
            headers: {
                "X-RateLimit-Limit": result.limit.toString(),
                "X-RateLimit-Remaining": result.remaining.toString(),
            },
        });
    } catch (err) {
        return Response.error();
    }
}
