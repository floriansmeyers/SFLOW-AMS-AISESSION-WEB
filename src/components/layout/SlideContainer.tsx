"use client";

import { ReactNode } from "react";

export function SlideContainer({ children }: { children: ReactNode }) {
  return <div className="snap-container">{children}</div>;
}
