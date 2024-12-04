import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4 w-[min(600px,100%)] mx-auto py-6 px-4">
      <Image
        src={`/assets/images/404.svg`}
        alt={"404 Page Not found illustration"}
        width={400}
        height={400}
        className="object-contain w-[min(250px,100%)]"
      />
      <h2 className="text-xl">Page Not Found</h2>
      <Link
        href="/"
        className="px-4 py-2 text-md font-semibold bg-[#88A6FA] rounded-lg flex items-center gap-3 text-white"
      >
        Go To Home
      </Link>
    </div>
  );
}
