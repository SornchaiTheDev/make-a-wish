import { Candy, Heart, Laugh } from 'lucide-react';
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
 

  return new ImageResponse(
    (
      <div style={{ display: "flex" }} tw="bg-black flex justify-center items-center w-full h-screen">
        <div tw='p-6 w-1/2 flex flex-col text-black gap-2 bg-white/95 border rounded-lg shadow-lg'>
          <h5>จาก</h5>
          <h2 tw='text-lg'>{"โชกุน" ?? "กำลังโหลด..."}</h2>

          <h5 tw='mt-4'>คำอวยพร</h5>
          <div tw='flex max-h-[14rem]'>
            <p tw='text-lg'>{undefined ?? "กำลังโหลด..."}</p>
          </div>

        </div>
      </div>

    ),
    {
      width: 1200,
      height: 630,
    },
  );
}