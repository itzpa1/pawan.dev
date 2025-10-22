import { SectionHeader } from "@/components/graphic/SectionHeader";
import { Portfolio } from "@/components/graphic/Portifolio";

export const RightSection = () => {
  return (
    <div className="md:w-1/2 md:overflow-y-auto px-6 md:px-0">
      <div className="md:pr-8 space-y-8">
        <SectionHeader title={"My Work"} />
        <Portfolio />
      </div>
    </div>
  );
};
