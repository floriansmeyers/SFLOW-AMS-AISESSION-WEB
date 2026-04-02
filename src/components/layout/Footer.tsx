import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sflow-glass-border bg-sflow-darker">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link
              href="https://sflow.be"
              target="_blank"
              className="text-sflow-gold font-semibold text-lg hover:text-sflow-gold-hover transition-colors"
            >
              SFLOW
            </Link>
            <p className="text-sflow-muted text-sm">
              AI Agents for Operations
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1 text-sm text-sflow-muted">
            <a
              href="mailto:florian@sflow.be"
              className="hover:text-sflow-cream transition-colors"
            >
              florian@sflow.be
            </a>
            <p>
              Presented at{" "}
              <a
                href="https://www.antwerpmanagementschool.be"
                target="_blank"
                className="hover:text-sflow-cream transition-colors"
              >
                Antwerp Management School
              </a>{" "}
             - April 2, 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
