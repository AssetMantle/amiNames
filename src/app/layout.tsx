import "../../styles/globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/ui_components";
import CosmosKitProvider from "@/ui_components/CosmosKitProvider";
const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";
import Footer from "@/ui_components/Footer";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/assets/fonts/ClashDisplay-Regular.woff",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/ClashDisplay-Medium.woff",
      weight: "500",
    },
    {
      path: "../../public/assets/fonts/ClashDisplay-Semibold.woff",
      weight: "600",
    },
    {
      path: "../../public/assets/fonts/ClashDisplay-Bold.woff",
      weight: "700",
    },
  ],
  variable: "--font-clashDisplay",
});

export const metadata: Metadata = {
  title: "AMI Names",
  description: "Claim your AMI Names",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="AMI Names" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${clashDisplay.className}`}>
        {/* <div className="absolute w-[30%] h-[30%] top-[25%] left-[15%]">
          <div className="gradientBg w-full h-full rounded-full shadow-lg opacity-30 blur-[80px] z-10"></div>
        </div> */}
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          limit={6}
        />
        <CosmosKitProvider>
          <Header />
          {children}
          <Footer />
        </CosmosKitProvider>
      </body>
    </html>
  );
}
