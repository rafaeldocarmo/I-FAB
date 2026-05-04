import Image from "next/image";
import ifabLogo from "@/public/badge.png";



export function OfficialSiteBadge() {
  return (
    <aside
      className="fixed bottom-5 right-5 z-50 drop-shadow-lg sm:bottom-6 sm:right-6"
      aria-label="Official i-FAB website"
    >
      <div
        className="w-[140px] p-px border-2 border-[#8d1d1c] bg-white rounded-full"
      >
        <div
          className="flex flex-col items-center">
          <Image
            src={ifabLogo}
            alt=""
            width={140}
            className="w-auto max-w-[130px] object-contain object-center aspect-square"
            priority={false}
          />
        </div>
      </div>
    </aside>
  );
}
