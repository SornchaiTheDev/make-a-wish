import { db } from "../firebase";
import { FieldValue } from "firebase-admin/firestore";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
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
  const { from, to, body, token } = res;

  let formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET!);
  formData.append("response", token);
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
    sent_at: Date.now(),
  };

  try {
    const wishCountRef = db.collection("counts").doc("uByQZnEh0JWTosVtsY4Q");
    await wishCountRef.update({
      amount: FieldValue.increment(1),
    });

    await db.collection("people").doc(to).collection("wishes").add(wishDoc);

    return Response.json("success", {
      headers: {
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
      },
    });
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}
