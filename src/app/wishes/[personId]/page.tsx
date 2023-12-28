"use client";

import Lottie from "~/components/Lottie";
import firework from "~/lottie/firework.json";
import Wish from "~/components/Wish";
import { TWish } from "~/types/TWish";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import WishSkeleton from "~/components/WishSkeleton";
import { useInView } from "react-intersection-observer";

interface ReturnedWish {
  count: number;
  wishes: TWish[];
  lastWish: number;
  isEnded: boolean;
}

const WishPage = ({ params }: { params: { personId: string } }) => {
  const { personId } = params;
  const [wishes, setWishes] = useState<TWish[]>([]);
  const [lastWish, setLastWish] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEmptyWishes = wishes.length === 0;

  const { ref, inView } = useInView({ delay: 500 });

  const handleOnHomeClick = () => {
    window.location.href = "/";
  };

  const getWishes = useCallback(
    async (wish: number | null = null) => {
      setIsLoading(true);
      const res = await axios.post<ReturnedWish>(`/api/v1/wishes/${personId}`, {
        lastWish: wish,
      });
      const { lastWish, wishes } = res.data;

      setIsLoading(false);
      setLastWish(lastWish);

      setWishes((prev) => [...prev, ...wishes]);
    },
    [personId]
  );

  useEffect(() => {
    if (inView) {
      getWishes(lastWish);
    }
  }, [inView, getWishes, lastWish]);

  return (
    <>
      <div className="fixed top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src={firework} loop />
      </div>
      <div className="container max-w-2xl mx-auto">
        <div className="w-full max-w-[40rem] p-10 mt-10">
          <button
            onClick={handleOnHomeClick}
            className="mt-4 mb-10 border p-2 rounded-lg hover:bg-white hover:text-primary"
          >
            กลับไปหน้าหลัก
          </button>
          <h6 className="text-lg">ถึง</h6>
          <h2 className="text-center text-4xl">{personId}</h2>
          <h4 className="text-xl mt-10">คำอวยพรทั้งหมด</h4>
          <div className="flex flex-col gap-8 mt-10">
            {wishes.map((wish) => (
              <Wish key={wish.id} {...{ wish }} />
            ))}
            {isLoading && (
              <>
                <WishSkeleton />
                <WishSkeleton />
              </>
            )}
          </div>
          <div ref={ref} />
        </div>
      </div>
    </>
  );
};

export default WishPage;
