"use client";

import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Background from "~/components/Background";

function SearchUserWishPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOnViewClick = async () => {
    setIsError(false);
    setIsLoading(true);
    const payload = {
      username,
      password,
    };
    try {
      const res = await axios.post("/api/v1/login", payload);
      window.location.href = `/wishes/${res.data.id}`;
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
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col items-center gap-2 rounded-lg p-4 max-w-[30rem] w-full">
          <a
            href="/"
            className="mt-4 p-2 self-start rounded-lg flex gap-2 items-center hover:text-neutral-200"
          >
            <ArrowLeft /> ย้อนกลับ
          </a>
          <h5 className="text-3xl mb-4 font-medium mt-8">เปิดกล่องคำอวยพร</h5>
          <div className="w-full">
            {isError && (
              <p className="text-red-500 mb-8">ชื่อผู้ใช้หรือรหัสผ่านผิด</p>
            )}
            <h6 className="text-2xl">ชื่อบัญชีของคุณ</h6>
            <input
              value={username}
              onChange={handleOnUsernameChange}
              className="border p-4 rounded-2xl text-lg w-full  border-white mt-4 bg-transparent"
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
            onClick={handleOnViewClick}
            className="hover:bg-white hover:text-black border-2 px-8 py-4 rounded-full w-full text-center mt-10 flex justify-center items-center gap-2"
          >
            {isLoading && (
              <div className="animate-spin">
                <Loader2 />
              </div>
            )}
            {isLoading
              ? "กำลังเช็คว่าคุณคือเจ้าของกล่อง"
              : "เปิดกล่องคำอวยพรของคุณ"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchUserWishPage;
