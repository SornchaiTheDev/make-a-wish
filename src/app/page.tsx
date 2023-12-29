import Background from "~/components/Background";
import Countdown from "~/components/Countdown";
import Lottie from "~/components/Lottie";
import WishSection from "~/components/WishSection";

export default function Home() {
  return (
    <>
      <Background />
      <div className="flex flex-col justify-center items-center h-screen z-50 gap-2">
        <img
          className="w-48"
          src="https://tech.nisit.ku.ac.th/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FKU-TECH-Logo-TW.c7910bdd.png&w=640&q=75"
        />
        <div>
          <h2 className="text-3xl text-center mb-8  font-bold">
            เคาท์ดาวน์ปีใหม่ 2567
          </h2>
          <Countdown />
        </div>
        <WishSection />
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
