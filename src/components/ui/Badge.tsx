import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-sflow-gold/15 px-3 py-1 text-sm font-medium text-sflow-gold">
      {children}
    </span>
  );
}
