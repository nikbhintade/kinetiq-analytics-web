"use client";

import { useEffect, useState } from "react";

export default function TotalSupply() {
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/total-supply");
        const json = await res.json();
        const rawSupply = json?.TotalSupplySnapshot?.[0]?.totalSupply;

        if (rawSupply) {
          // Convert from 18 decimal
          const normalSupply = Number(rawSupply) / 1e18;
          setTotalSupply(normalSupply.toLocaleString());
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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!totalSupply) return <p className="text-red-500">No data</p>;

  return <p className="text-purple-200 text-2xl font-bold">{totalSupply}</p>;
}
