"use client";

import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Background from "~/components/Background";

function MakeWishBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOnCreateClick = async () => {
    setIsError(false);
    const payload = {
      username,
      password,
    };
    setIsLoading(true);
    try {
      const res = await axios.post("/api/v1/create", payload);

      window.location.href = `/wishes/${res.data}`;
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleOnUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleOnPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Background />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-2 rounded-lg p-4 max-w-[30rem] w-full">
          <a
            href="/"
            className="mt-4 p-2 self-start rounded-lg flex gap-2 items-center hover:text-neutral-200"
          >
            <ArrowLeft /> ย้อนกลับ
          </a>
          <h5 className="text-3xl mb-4 font-medium mt-8">สร้างกล่องคำอวยพร</h5>
          <div className="w-full">
            {isError && (
              <p className="text-red-500 mb-8">มีชื่อผู้ใช้นี้อยู่แล้ว</p>
            )}
            <h6 className="text-xl">ตั้งชื่อบัญชีของคุณ</h6>
            <input
              value={username}
              onChange={handleOnUsernameChange}
              className="border p-4 rounded-2xl w-full text-lg border-white mt-4 bg-transparent"
              placeholder="ku.t3ch"
            />
            <h6 className="text-xl mt-4">รหัสผ่าน</h6>
            <input
              value={password}
              type="password"
              onChange={handleOnPasswordChange}
              className="border p-4 rounded-2xl w-full text-lg border-white mt-4 bg-transparent"
              placeholder="••••••••••"
            />
          </div>

          <button
            disabled={isLoading}
            onClick={handleOnCreateClick}
            className="hover:bg-white hover:text-black border-2 px-8 py-4 rounded-full w-full text-center mt-10 flex justify-center items-center gap-2"
          >
            {isLoading && (
              <div className="animate-spin">
                <Loader2 />
              </div>
            )}
            {isLoading
              ? "กำลังสร้างกล่องรับคำอวยพรของคุณ"
              : "สร้างกล่องรับคำอวยพรของคุณ"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MakeWishBox;
