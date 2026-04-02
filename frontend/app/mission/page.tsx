import { MissionHero } from "@/components/sections/MissionHero";
import { MissionContent } from "@/app/mission/MissionContent";

export const metadata = {
  title: "About Us — i-FAB",
  description:
    "i-FAB promotes the scientific value of foot and ankle biomechanics, raises visibility through international congresses and events, bridges academia and industry, and encourages multidisciplinary collaboration worldwide.",
};

const MISSION_HERO_QUOTE =
  "i-FAB is driven by the desire to improve our understanding of foot and ankle biomechanics as it applies to health, disease, and the design, development and evaluation of foot and ankle surgery, and interventions such as footwear and insoles/orthotics.";

const MISSION_HERO_BODY =
  "i-FAB is an international collaborative community of all those interested in foot and ankle biomechanics. Launched in 2007 we now have over 800 members worldwide and have brought together over 1000 people through our congress activities.";

export default function MissionPage() {
  return (
    <div>
      <MissionHero quote={MISSION_HERO_QUOTE} body={MISSION_HERO_BODY} />
      <MissionContent />
    </div>
  );
}
