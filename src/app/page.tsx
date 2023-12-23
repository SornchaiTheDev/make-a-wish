import Countdown from "~/components/Countdown"
import Lottie from "~/components/Lottie"
import Wish from "~/components/Wish"
import WishSection from "~/components/WishSection"

export default function Home() {
  return (
    <>
      <div className="absolute top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src="https://lottie.host/ef833a83-40b1-4ddc-ad37-808e59c1917a/zMSRTO7kU2.json" loop />
      </div>
      <div className="flex flex-col justify-center items-center h-screen z-50 gap-12">
        <div>
          <h2 className="text-xl text-center mb-8">เคาท์ดาวน์ปีใหม่ 2567</h2>
          <Countdown />
        </div>
        <WishSection />
        <p className="text-center">&copy; 2023 by KU Tech @ Kasetsart University</p>
      </div>
    </>
  )
}
