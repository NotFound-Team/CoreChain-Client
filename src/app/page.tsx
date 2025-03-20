// -- Components --
import PlatformIntro from "@/components/PlatformIntro";
import FeatureHighlights from "@/components/FeatureHighlights";
import Steps from "@/components/Steps";
import Pricing from "@/components/Pricing";
import ButtonMode from "@/components/ButtonMode";

export default function Home() {
  return (
    <>
      <PlatformIntro />
      <FeatureHighlights />
      <Pricing />
      <Steps />
      <ButtonMode />
    </>
  );
}
