"use client";

import { useState } from "react";
import { formatNumber } from "~/utils";
import MakeAWish from "./MakeAWish";
import { AnimatePresence } from "framer-motion";
import Lottie from "./Lottie";
import { PlayerEvent } from "@lottiefiles/react-lottie-player";
import { useWishCount } from "~/hooks/useWishCount";
import axios from "axios";
import { TAddWish } from "~/types/TAddWish";
import send from "~/lottie/send.json";

function WishSection() {
  const [isMakeAWishOpen, setIsMakeAWishOpen] = useState(false);
  const [wishId, setWishId] = useState("");
  const [isSent, setIsSent] = useState(false);
  const { wishCount } = useWishCount();

  const handleOnMakeAWishClick = () => {
    setIsMakeAWishOpen(true);
  };

  const handleOnCloseClick = () => {
    setIsMakeAWishOpen(false);
  };

  const handleOnSubmitAWish = async (wish: TAddWish) => {
    const res = await axios.post("/api/v1/wishes", wish);
    setIsMakeAWishOpen(false);
    setIsSent(true);
    setWishId(res.data);
  };

  const handleOnLottieEvent = (e: PlayerEvent) => {
    if (e === "complete") {
      setIsSent(false);
      if (wishId === "RATE_LIMIT") return;
    }
  };

  return (
    <>
      {isSent && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2">
          <Lottie
            onEvent={handleOnLottieEvent}
            src={send}
            keepLastFrame
            style={{ width: "40rem" }}
          />
        </div>
      )}
      <AnimatePresence>
        {isMakeAWishOpen && (
          <MakeAWish
            onClose={handleOnCloseClick}
            onSubmit={handleOnSubmitAWish}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-64">
        <h6 className="text-center text-xl mt-8 mb-4">
          คำอวยพรทั้งหมด <span>•</span> {formatNumber(wishCount)} ครั้ง
        </h6>
        <a
          href="/wishes"
          className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full block text-center mt-10"
        >
          เปิดกล่องคำอวยพร
        </a>
        <div className="flex mx-auto my-4 w-1/2 gap-2 items-center">
          <div className="border flex-1 bg-white"></div>
          <p>หรือ</p>
          <div className="border flex-1 bg-white"></div>
        </div>
        <a
          href="/make"
          className="bg-white hover:bg-white/70 hover:text-black/90 text-black border-2 px-8 py-2 rounded-full w-full block text-center"
        >
          สร้างกล่องคำอวยพร
        </a>
      </div>
    </>
  );
}

export default WishSection;
