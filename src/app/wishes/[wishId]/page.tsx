import Lottie from '~/components/Lottie'
import { notFound } from 'next/navigation'
import firework from '~/lottie/firework.json'
import Wish from '~/components/Wish'
import { TWish } from '~/types/TWish'

const getWish = async (wishId: string): Promise<TWish | null> => {
  const res = await fetch(`${process.env.DOMAIN}/api/v1/wishes/${wishId}`, { cache: "no-cache" });
  return res.json()
};


async function WishPage({ params }: { params: { wishId: string } }) {

  let wishObject = await getWish(params.wishId)
  if (wishObject === null) {
    notFound()
  }

  return (
    <>
      <div className="absolute top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src={firework} loop />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center h-screen p-4">
        {!!wishObject && <Wish {...{ wishObject }} />}
      </div>
    </>
  )
}

export default WishPage