"use client";

import TurnstileWidget from "~/components/TurnstileWidget";
import { ChangeEvent, useEffect, useState } from "react";
import { TAddWish } from "~/types/TAddWish";
import axios from "axios";
import Background from "~/components/Background";

function SendClient({
  personId,
  username,
}: {
  personId: string;
  username: string;
}) {
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const to = personId;

  const fromLength = from.length;
  const bodyLength = body.length;

  const handleOnFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _fromLength = e.target.value.length;

    if (_fromLength > 20) return;
    setFrom(e.target.value);
  };

  const handleOnBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const _bodyLength = e.target.value.length;

    if (_bodyLength > 200) return;
    setBody(e.target.value);
  };

  const submitAWish = async () => {
    const isFromEmpty = from.length === 0;
    const isBodyEmpty = body.length === 0;
    const isTokenEmpty = token.length === 0;

    const isSomeFieldEmpty = isFromEmpty || isBodyEmpty || isTokenEmpty;

    if (isSomeFieldEmpty) return;

    const wish: TAddWish = {
      from,
      to,
      body,
      token,
    };

    setIsLoading(true);
    try {
      await axios.post("/api/v1/wishes", wish);
      window.location.href = `/send/${personId}/success`;
    } catch (err) {}
    setIsLoading(false);
  };

  return (
    <>
      <Background />
      <div className="p-4 max-w-lg container mx-auto flex flex-col gap-2">
        <div className="mb-2 relative">
          <h6 className="text-end absolute top-2 right-2">
            อยากได้รับคำอวยพร ?{" "}
            <a href="/make" className="font-bold text-yellow-500 underline">
              สร้างตรงนี้
            </a>
          </h6>

          <h4 className="text-lg mt-8">ส่งคำอวยพรไปให้</h4>
          <h4 className="text-4xl font-medium my-2">{username}</h4>
        </div>
        <h4>จาก</h4>
        <input
          value={from}
          onChange={handleOnFromChange}
          placeholder="ชื่อผู้ส่ง"
          className="text-lg outline-none w-full bg-transparent border p-2 border-white/30 rounded-lg"
        />
        <p className="text-xs text-neutral-400">{fromLength}/20</p>
        <h4 className="mt-4">คำอวยพร</h4>
        <textarea
          value={body}
          onChange={handleOnBodyChange}
          className="w-full outline-none text-lg bg-transparent border border-white/30 p-2 rounded-lg"
          placeholder="เขียนคำอวยพรตรงนี้"
          rows={6}
        />
        <p className="text-xs text-neutral-400">{bodyLength}/200</p>
        <div className="flex justify-center mt-4">
          <TurnstileWidget
            onVerify={(c) => {
              setToken(c);
            }}
          />
        </div>
        <button
          disabled={isLoading}
          onClick={submitAWish}
          className="border w-full rounded-full bg-neutral-700 hover:bg-neutral-800 py-2 text-white mt-4"
        >
          {isLoading ? "กำลังส่ง" : "ส่ง"}
        </button>
        <div className="mt-8">
          <h6 className="text-center">
            Made by{" "}
            <a
              href="https://sornchaithedev.com"
              target="_blank"
              className="font-medium underline"
            >
              @SornchaiTheDev
            </a>
          </h6>
          <p className="text-center ">
            Powered By KU Tech @ Kasetsart University
          </p>
        </div>
      </div>
    </>
  );
}

export default SendClient;
