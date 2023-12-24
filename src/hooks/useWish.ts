import axios from "axios";
import { useState } from "react";
import { TWish } from "~/types/TWish";

interface Params {
  wishObject: TWish;
}
export const useWish = ({ wishObject }: Params) => {
  const [wish, setWish] = useState(wishObject);

  const sendReaction = async (reaction: "love" | "laugh" | "candy") => {
    if (wish !== null) {
      setWish({
        ...wish,
        [reaction]: wish[reaction] + 1,
      });
    }

    await axios.put(`/api/v1/wishes/${wish.id}`, {
      reaction,
    });
  };

  return { wish, sendReaction };
};
