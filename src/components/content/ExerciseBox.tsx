"use client";

import { CopyButton } from "@/components/ui/CopyButton";

interface ExerciseStep {
  text: string;
  copyText?: string;
}

interface ExerciseBoxProps {
  title: string;
  goal?: string;
  steps: ExerciseStep[];
}

export function ExerciseBox({ title, goal, steps }: ExerciseBoxProps) {
  return (
    <div className="rounded-xl border-2 border-sflow-gold/30 bg-sflow-gold/5 p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">&#9997;&#65039;</span>
        <h3 className="text-lg font-semibold text-sflow-gold">{title}</h3>
      </div>
      <ol className="space-y-3 list-none">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-sflow-cream">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sflow-gold/20 text-xs font-bold text-sflow-gold">
              {i + 1}
            </span>
            <div className="flex-1">
              <p>{step.text}</p>
              {step.copyText && (
                <div className="mt-2 flex items-center gap-2 rounded-md bg-sflow-dark/50 px-3 py-2">
                  <code className="flex-1 text-xs text-sflow-cream-muted break-all">
                    {step.copyText}
                  </code>
                  <CopyButton text={step.copyText} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      {goal && (
        <p className="mt-4 text-sm text-sflow-gold/80 border-t border-sflow-gold/20 pt-3">
          <strong>Goal:</strong> {goal}
        </p>
      )}
    </div>
  );
}
