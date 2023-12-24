import axios from "axios";
import { useEffect, useState } from "react";
import { TWish } from "~/types/TWish";

interface Params {
  id?: string;
}
export const useWish = ({ id }: Params) => {
  const [wish, setWish] = useState<TWish | null>(null);

  const sendReaction = async (reaction: "love" | "laugh" | "candy") => {
    if (wish !== null) {
      setWish({
        ...wish,
        [reaction]: wish[reaction] + 1,
      });
    }

    await axios.put(`/api/v1/wishes/${id}`, {
      reaction,
    });
  };

  useEffect(() => {
    const getWish = async () => {
      const res = await axios.get(`/api/v1/wishes/${id}`);
      setWish(res.data);
    };

    getWish();
  }, [id]);

  return { wish, sendReaction };
};
