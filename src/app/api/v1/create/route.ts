import { db } from "../firebase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const res = await req.json();

  const { username, password } = res;

  const hashedPassword = await bcrypt.hash(password, 10);

  const peopleRef = db.collection("people");

  try {
    const alreadyExist = await peopleRef
      .where("username", "==", username)
      .get();

    if (!alreadyExist.empty) {
      return Response.error();
    }

    const res = await peopleRef.add({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        data: res.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return Response.json(res.id);
  } catch (err) {
    return Response.error();
  }
}
