import type { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { Dancing_Script, Athiti } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const athiti = Athiti({ subsets : ["thai"] , weight: ["200", "300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: 'Make a wish',
  description: 'เวลาก็จะวนมาครบ 1 ปีอีกแล้วน้า ปีนี้เราผ่านอะไรมาเยอะเลย เราทุกคนเก่งมากเย่',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge(dancingScript.className, athiti.className ,"bg-black")}>{children}</body>
    </html>
  )
}
