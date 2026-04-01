"use client";

import { useState } from "react";
import { MODELS } from "@/lib/constants";

type Tier = "all" | "budget" | "daily" | "complex";

const TIER_LABELS: Record<Tier, string> = {
  all: "All",
  budget: "Budget",
  daily: "Daily Work",
  complex: "Complex Analysis",
};

export function ModelTable() {
  const [filter, setFilter] = useState<Tier>("all");

  const filtered =
    filter === "all" ? MODELS : MODELS.filter((m) => m.tier === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(TIER_LABELS) as Tier[]).map((tier) => (
          <button
            key={tier}
            onClick={() => setFilter(tier)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filter === tier
                ? "bg-sflow-gold text-sflow-dark font-medium"
                : "bg-sflow-glass text-sflow-cream-muted hover:bg-sflow-glass-hover"
            }`}
          >
            {TIER_LABELS[tier]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-sflow-glass-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sflow-glass-border bg-sflow-glass">
              <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                Model
              </th>
              <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                Context
              </th>
              <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                Price / 1M tokens
              </th>
              <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                Best For
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((model) => (
              <tr
                key={model.name}
                className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors"
              >
                <td className="px-4 py-3 font-medium text-sflow-cream">
                  {model.name}
                </td>
                <td className="px-4 py-3 text-sflow-cream-muted">
                  {model.context}
                </td>
                <td className="px-4 py-3 text-sflow-gold">{model.price}</td>
                <td className="px-4 py-3 text-sflow-cream-muted">
                  {model.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
