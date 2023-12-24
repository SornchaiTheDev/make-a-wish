import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { Dancing_Script, Athiti } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const athiti = Athiti({ subsets: ["thai"], weight: ["200", "300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Make a wish | KU Tech",
  description: "เวลาก็จะวนมาครบ 1 ปีอีกแล้วน้า ปีนี้เราผ่านอะไรมาเยอะเลย เราทุกคนเก่งมากเย่",
  authors : {
    name : "SornchaiTheDev",
    url : "https://sornchaithedev.com"
  },
  keywords: ["อวยพรปีใหม่"],
  // openGraph: {
  //   title: "Make a wish",
  //   description: "เวลาก็จะวนมาครบ 1 ปีอีกแล้วน้า ปีนี้เราผ่านอะไรมาเยอะเลย เราทุกคนเก่งมากเย่",
  //   url: process.env.DOMAIN,
  //   images: [
  //     {
  //       url: `${process.env.DOMAIN}/api/v1/og/og`,
  //       width: 1200,
  //       height: 630
  //     }
  //   ]
  // }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge(dancingScript.className, athiti.className, "bg-black")}>{children}</body>
    </html>
  )
}
