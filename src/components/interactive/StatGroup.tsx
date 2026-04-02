"use client";

import { AnimatedStat } from "./AnimatedStat";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  source?: { label: string; url: string };
}

const smColsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export function StatGroup({ stats }: { stats: Stat[] }) {
  const smCols = smColsMap[stats.length] ?? "sm:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-6 rounded-xl border border-sflow-glass-border bg-sflow-glass p-6 ${smCols} sm:gap-8 sm:p-8`}>
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
