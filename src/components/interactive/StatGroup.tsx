"use client";

import { AnimatedStat } from "./AnimatedStat";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export function StatGroup({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-xl border border-sflow-glass-border bg-sflow-glass p-6 sm:grid-cols-4 sm:gap-8 sm:p-8">
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
