import { JoinHero } from "@/components/sections/JoinHero";
import { JoinForm } from "./JoinForm";

export const metadata = {
  title: "Join i-FAB — International Foot and Ankle Biomechanics Community",
  description:
    "Express your interest in joining the i-FAB community: researchers, clinicians, and industry partners in foot and ankle biomechanics.",
};

export default function JoinPage() {
  return (
    <div>
      <JoinHero />

      <section className=" bg-white pb-20 pt-4 sm:pb-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <JoinForm />
        </div>
      </section>
    </div>
  );
}
