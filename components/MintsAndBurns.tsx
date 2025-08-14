"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function MintsBurnsChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/mints-burns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query MintsBurnsPerDay {
                MintBurnSnapshot(limit: 30) {
                  burns
                  date
                  mints
                  id
                }
              }
            `,
          }),
        });

        const json = await res.json();
        console.log("Fetched data:", json);

        const processed = (json?.MintBurnSnapshot || []).map((d: any) => {
          const mintsValue = Number(d.mints) / 1e18;
          const burnsValue = Number(d.burns) / 1e18;
          return {
            date: new Date(d.date * 1000).toLocaleDateString("en-GB"),
            mints: mintsValue > 0 ? mintsValue : 0, // keep positive
            burns: burnsValue > 0 ? -burnsValue : 0, // flip to negative
          };
        });

        setData(processed);
      } catch (err) {
        console.error("Chart fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl h-56 p-3 flex flex-col">
      <h2 className="text-sm font-semibold text-purple-200 mb-2">
        Mints vs Burns
      </h2>
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="date" stroke="#ddd" tick={{ fontSize: 10 }} />
            <YAxis
              stroke="#ddd"
              tick={{ fontSize: 10 }}
              domain={["auto", "auto"]}
              scale="symlog"
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
              labelStyle={{ color: "#fff" }}
              formatter={(value: number) =>
                Math.abs(value).toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })
              }
            />
            <Legend />
            <ReferenceLine y={0} stroke="#ccc" />
            <Bar dataKey="mints" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="burns" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
