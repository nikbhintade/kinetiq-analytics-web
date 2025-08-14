"use client";

import { useEffect, useState } from "react";

export default function TotalSupply() {
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function formatNumber(num: number) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num.toLocaleString();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const TOTAL_SUPPLY_QUERY = `
          query TotalSupply {
            TotalSupplySnapshot(limit: 1, order_by: { blockNumber: desc }) {
              id
              totalSupply
              blockNumber
            }
          }
        `;

        const res = await fetch("/api/total-supply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: TOTAL_SUPPLY_QUERY }),
        });

        const json = await res.json();
        const rawSupply = json?.TotalSupplySnapshot?.[0]?.totalSupply;

        if (rawSupply) {
          const normalSupply = Number(rawSupply) / 1e18;
          setTotalSupply(formatNumber(normalSupply));
        } else {
          setTotalSupply(null);
        }
      } catch (err) {
        console.error("Error fetching total supply:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white/3 border border-white/10 rounded-xl p-5 h-40 flex flex-col justify-between">
      <div>
        <div className="text-purple-200 font-semibold text-lg leading-tight">
          Total Supply
        </div>
        <div className="text-white/60 text-sm mt-1">
          Current circulating supply
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <div className="text-purple-300 font-extrabold text-2xl md:text-4xl leading-tight text-center animate-pulse">
            Loading...
          </div>
        ) : !totalSupply ? (
          <div className="text-red-500 text-lg text-center">No data</div>
        ) : (
          <div className="text-purple-300 font-extrabold text-4xl md:text-6xl leading-tight text-center">
            {totalSupply}
          </div>
        )}
      </div>
    </div>
  );
}
