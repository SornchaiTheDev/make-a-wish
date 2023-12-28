import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Dancing_Script, Athiti } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({ subsets: ["latin"] });
const athiti = Athiti({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Make a wish | KU Tech",
  description:
    "เวลาก็จะวนมาครบ 1 ปีอีกแล้วน้า ปีนี้เราผ่านอะไรมาเยอะเลย เราทุกคนเก่งมากเย่",
  authors: {
    name: "SornchaiTheDev",
    url: "https://sornchaithedev.com",
  },
  keywords: ["อวยพรปีใหม่"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="6816f800-bce5-4021-8c57-9d60f677bcb8"
        ></script>
      </head>
      <body
        className={twMerge(
          dancingScript.className,
          athiti.className,
          "bg-primary"
        )}
      >
        {children}
      </body>
    </html>
  );
}
