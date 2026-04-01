interface DemoCalloutProps {
  title: string;
  description: string;
}

export function DemoCallout({ title, description }: DemoCalloutProps) {
  return (
    <div className="rounded-xl border border-sflow-glass-border bg-sflow-card p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center rounded-md bg-sflow-gold/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-sflow-gold">
          Demo
        </span>
        <h4 className="font-semibold text-sflow-cream">{title}</h4>
      </div>
      <p className="text-sm text-sflow-cream-muted">{description}</p>
    </div>
  );
}
