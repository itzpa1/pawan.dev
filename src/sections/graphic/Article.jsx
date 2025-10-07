import { SectionHeader } from "@/components/graphic/SectionHeader";
import { Portfolio } from "@/components/graphic/Portifolio";

export const RightSection = () => {
  return (
    <div className="w-1/2 overflow-y-auto">
      <div className="pr-8 space-y-8">
        <SectionHeader title={"My Work"} />
        <Portfolio />
      </div>
    </div>
  );
};
