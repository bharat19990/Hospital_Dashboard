import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <p className="mt-4 max-w-md text-sm font-medium text-slate-700">{message}</p>
      {onRetry ? (
        <Button type="button" onClick={onRetry} className="mt-5 gap-2 rounded-lg bg-[#1E3A5F]">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      ) : null}
    </div>
  );
}
