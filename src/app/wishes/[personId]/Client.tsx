"use client";

import Lottie from "~/components/Lottie";
import firework from "~/lottie/firework.json";
import Wish from "~/components/Wish";
import { TWish } from "~/types/TWish";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import WishSkeleton from "~/components/WishSkeleton";
import { useInView } from "react-intersection-observer";
import { ArrowLeft, Link } from "lucide-react";

interface ReturnedWish {
  count: number;
  wishes: TWish[];
  lastWish: number;
  isEnded: boolean;
  person: {
    username: string;
    password: string;
  };
}

interface Props {
  personId: string;
}

const WishClient = ({ personId }: Props) => {
  const [wishes, setWishes] = useState<TWish[]>([]);
  const [username, setUsername] = useState("กำลังโหลด");
  const [lastWish, setLastWish] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const isEmptyWishes = wishes.length === 0;
  const wishLink = `https://hny2024.kutech.club/send/${personId}`;

  const { ref, inView } = useInView({ threshold: 1, delay: 500 });

  const handleOnClickCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(wishLink);
    }
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  const getWishes = useCallback(async () => {
    setIsLoading(true);
    const res = await axios.post<ReturnedWish>(`/api/v1/wishes/${personId}`, {
      lastWish,
    });
    const { lastWish: _lastWish, wishes, person } = res.data;
    setUsername(person.username);
    setIsLoading(false);
    setLastWish(_lastWish);

    setWishes((prev) => [...prev, ...wishes]);
  }, [personId, lastWish]);

  useEffect(() => {
    getWishes();
  }, [getWishes]);

  return (
    <>
      <div className="fixed top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src={firework} loop />
      </div>
      <div className="container max-w-2xl mx-auto">
        <div className="w-full max-w-[40rem] p-4">
          <a
            href="/"
            className="mt-4 mb-8 self-start rounded-lg flex gap-2 items-center hover:text-neutral-200"
          >
            <ArrowLeft /> กลับไปหน้าหลัก
          </a>
          <h6 className="text-lg">ถึง</h6>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center text-4xl">{username}</h2>
            <div className="flex gap-2  justify-center mt-4 items-center">
              <Link size="1rem" />
              <button
                onClick={handleOnClickCopy}
                className="text-sm lg:text-xl"
              >
                {wishLink}
              </button>
            </div>
            <p className="mt-2">
              {isCopied ? "คัดลอกลิงค์แล้ว" : "แตะเพื่อคัดลอกลิงค์"}
            </p>
          </div>
          <h4 className="text-xl mt-10">คำอวยพรทั้งหมด</h4>

          {!isLoading && isEmptyWishes && (
            <h5 className="text-xl text-center mt-36">ยังไม่มีคำอวยพร</h5>
          )}
          <div className="flex flex-col gap-8 mt-10">
            {!isLoading &&
              wishes.map((wish) => <Wish key={wish.id} {...{ wish }} />)}
            {isLoading && (
              <>
                <WishSkeleton />
                <WishSkeleton />
                <WishSkeleton />
                <WishSkeleton />
                <WishSkeleton />
                <WishSkeleton />
              </>
            )}
          </div>
          <button
            onClick={getWishes}
            className="hover:bg-white hover:text-black border-2 px-8 py-4 rounded-full w-full text-center mt-10 flex justify-center items-center gap-2"
          >
            โหลดเพิ่ม
          </button>
        </div>
      </div>
    </>
  );
};

export default WishClient;
