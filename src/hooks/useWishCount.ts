import { useEffect, useState } from "react";
import axios from "axios";

interface Params {
  
}

export const useWishCount = () => {
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    const getCounts = async () => {
      const res = await axios.get("/api/v1/wish-count");
      setWishCount(res.data.count);
    };

    getCounts();
  }, []);
  return {
    wishCount,
  };
};
