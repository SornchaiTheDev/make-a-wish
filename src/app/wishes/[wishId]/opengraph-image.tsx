import { ImageResponse } from "next/og";
import { TWish } from "~/types/TWish";

export const runtime = 'edge'

export default async function Image({ params }: { params: { wishId: string } }) {

  const { wishId } = params
  const res = await fetch(`http://localhost:3000/api/v1/wishes/${wishId}`);
  const wish: TWish = await res.json();

  const athitiBold = fetch(
    new URL('./Athiti-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
    console.log(import.meta.url)
  return new ImageResponse(
    (
      <div style={{ display: "flex" }} tw="bg-black flex justify-center items-center w-full h-screen">
        <h2 tw="text-6xl font-bold text-white">
          {wish.body}
        </h2>
      </div>

    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Athiti",
          data: await athitiBold,
          style: "normal",
          weight: 800
        }
      ]
    },
  );
}