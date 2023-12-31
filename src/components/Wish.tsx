"use client";

import { TWish } from "~/types/TWish";

interface Props {
  wish: TWish;
}

function Wish({ wish }: Props) {
  return (
    <div className="p-6 flex w-full text-neutral-800 gap-4 bg-white/95 backdrop-blur-sm flex-col border rounded-lg relative">
      <span className="text-9xl select-none text-primary absolute top-0 left-2">
        &ldquo;
      </span>
      <p className="text-4xl mt-12 break-words leading-relaxed">
        {wish.body ?? "กำลังโหลด..."}
      </p>
      <div className="flex items-center gap-2">
        <div className="max-w-[2rem] flex-1 border border-neutral-400"></div>
        <h6 className="text-lg">{wish.from}</h6>
      </div>
    </div>
  );
}

export default Wish;
