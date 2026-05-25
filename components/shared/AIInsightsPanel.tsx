import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInsightsSkeleton } from "@/components/shared/LoadingSkeleton";
import type { AIInsight } from "@/types";

export interface AIInsightsPanelProps {
  insights: AIInsight[];
  isLoading?: boolean;
  onRegenerate?: () => void;
}

export function AIInsightsPanel({ insights, isLoading, onRegenerate }: AIInsightsPanelProps) {
  if (isLoading) {
    return <AIInsightsSkeleton />;
  }

  return (
    <section className="rounded-xl bg-gradient-to-r from-[#063B7A] via-[#07569B] to-[#0D9488] p-5 text-white shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-[#1E3A5F]">
              <Sparkles className="h-6 w-6" />
            </span>
            <h2 className="text-xl font-bold tracking-normal">AI-Generated Insights</h2>
          </div>
          <ol className="mt-4 space-y-2">
            {insights
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((insight, index) => (
                <li key={`${insight.channel}-${insight.priority}`} className="flex gap-3 text-sm leading-5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#1E3A5F]">
                    {index + 1}
                  </span>
                  <span>{insight.text}</span>
                </li>
              ))}
          </ol>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onRegenerate}
          className="h-11 rounded-lg border-white/30 bg-white px-6 font-semibold text-[#1E3A5F] hover:bg-white/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      </div>
    </section>
  );
}
