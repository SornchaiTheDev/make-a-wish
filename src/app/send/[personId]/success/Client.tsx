"use client";

import { PlayerEvent } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import Lottie from "~/components/Lottie";
import send from "~/lottie/send.json";

function SendSuccessClient({ username }: { username: string }) {
  const [isSent, setIsSent] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  const handleOnLottieEvent = (e: PlayerEvent) => {
    if (e === "complete") {
      setIsSent(false);
    }
  };

  return (
    <>
      {isSent && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Lottie
            onEvent={handleOnLottieEvent}
            src={send}
            keepLastFrame
            style={{ width: "40rem" }}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 justify-center items-center h-screen relative">
        <h5 className="text-lg">ส่งคำอวยพรให้</h5>
        <h4 className="text-4xl">{username}</h4>
        <h4 className="text-lg">เรียบร้อยแล้ว ! </h4>
      </div>
    </>
  );
}

export default SendSuccessClient;
