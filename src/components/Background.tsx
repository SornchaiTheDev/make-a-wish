import Lottie from "./Lottie";
import firework from "~/lottie/firework.json";

function Background() {
  return (
    <>
      <div className="absolute top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src={firework} loop />
      </div>
      <div
        className="fixed -z-10 bottom-0 h-screen w-full bg-center"
        style={{ background: "url('/images/town.png')" }}
      />
    </>
  );
}

export default Background;
