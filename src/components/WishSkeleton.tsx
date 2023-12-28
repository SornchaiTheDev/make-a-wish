import React from "react";

function WishSkeleton() {
  return (
    <div className="p-6 flex w-full text-neutral-800 gap-4 bg-white/95 backdrop-blur-sm flex-col border rounded-lg relative">
      <span className="text-9xl select-none text-primary absolute top-0 left-2">
        &ldquo;
      </span>
      <div className="mt-16 w-full h-8 rounded-lg bg-neutral-300 animate-pulse"></div>
      <div className="w-full h-8 rounded-lg bg-neutral-300 animate-pulse"></div>
      <div className="flex items-center gap-2">
        <div className="max-w-[2rem] flex-1 border border-neutral-400"></div>
        <div className="w-20 h-6 rounded-lg bg-neutral-300"></div>
      </div>
    </div>
  );
}

export default WishSkeleton;
