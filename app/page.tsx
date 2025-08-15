import MintsBurnsChart from "@/components/MintsAndBurns";
import TotalSupply from "@/components/TotalSupply";
import TotalSupplyChart from "@/components/TotalSupplyChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-purple-200">
          Kinetiq Analytics
        </h1>

        {/* Top small stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TotalSupply />

          {/* <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-40 flex flex-col justify-between"></div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-40 flex flex-col justify-between"></div> */}
        </div>

        {/* Example second row */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl h-40"></div>
          <div className="bg-white/5 border border-white/10 rounded-xl h-40"></div>
          <div className="bg-white/5 border border-white/10 rounded-xl h-40"></div>
        </div> */}

        {/* Example large chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl">
          <MintsBurnsChart />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl">
          <TotalSupplyChart />
        </div>
      </div>
    </div>
  );
}
