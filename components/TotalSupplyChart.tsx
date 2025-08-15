"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

export default function TotalSupplyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/mints-burns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query TotalSupplySnapshot {
                TotalSupplySnapshot(limit: 1000, order_by: { blockNumber: desc }) {
                  id
                  totalSupply
                  blockNumber
                }
              }
            `,
          }),
        });

        const json = await res.json();

        if (json?.TotalSupplySnapshot) {
          const formatted = json.TotalSupplySnapshot.map((item: any) => ({
            blockNumber: item.blockNumber,
            totalSupply: Number(item.totalSupply) / 1e18, // convert from 18 decimals
          })).reverse(); // so block numbers go left-to-right

          setData(formatted);
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
    <div className="w-full h-96 bg-white/5 px-5 pt-5 pb-8 rounded-xl border border-white/10">
      <h2 className="text-purple-200 font-semibold text-lg leading-tight mb-3">
        Total Supply
      </h2>
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-center text-gray-400 text-sm">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Shadow definition */}
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodColor="#8b5cf6"
                  floodOpacity="0.4"
                />
              </filter>
            </defs>
            <XAxis
              dataKey="blockNumber"
              stroke="#ddd"
              tick={{ fontSize: 10 }}
            />
            <YAxis
              stroke="#ddd"
              tick={{ fontSize: 10 }}
              tickFormatter={(value: number) =>
                value >= 1e9
                  ? (value / 1e9).toFixed(2) + "B"
                  : value >= 1e6
                  ? (value / 1e6).toFixed(2) + "M"
                  : value.toLocaleString()
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                color: "#fff",
              }}
              formatter={(value: number) => [
                value.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                "Total Supply",
              ]}
            />

            {/* Shadowed area under the line */}
            <Area
              type="monotone"
              dataKey="totalSupply"
              stroke="none"
              fill="#8b5cf6"
              fillOpacity={0.2}
              filter="url(#shadow)"
            />

            {/* Main line */}
            <Line
              type="monotone"
              dataKey="totalSupply"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
