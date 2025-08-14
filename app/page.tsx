import Container from "@/components/Container";
import TotalSupply from "@/components/TotalSupply";

export default function Home() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 mt-10">Envio Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Supply */}
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold mb-2">Total Supply</h2>
          <TotalSupply />
        </div>
      </div>
    </Container>
  );
}
