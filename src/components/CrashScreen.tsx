import React, { useState } from "react";
import { sendBugReport } from "@/lib/bugReport";

interface CrashScreenProps {
  error: Error;
  resetError: () => void;
}

export const CrashScreen: React.FC<CrashScreenProps> = ({
  error,
  resetError,
}) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleReport = async () => {
    setSending(true);
    try {
      await sendBugReport(undefined, error);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-8 text-center">
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-mid-gray max-w-sm">
          MotsDits encountered an unexpected error. You can send a bug report to
          help us fix it, then reload the app.
        </p>
        {error.message && (
          <p className="text-xs font-mono text-mid-gray/60 max-w-sm break-all">
            {error.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        {!sent ? (
          <button
            onClick={handleReport}
            disabled={sending}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-background-ui text-white disabled:opacity-50 cursor-pointer"
          >
            {sending ? "Sending..." : "Send Bug Report"}
          </button>
        ) : (
          <span className="px-4 py-2 text-sm text-green-600 font-medium">
            Report sent. Thank you!
          </span>
        )}
        <button
          onClick={resetError}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-mid-gray/20 bg-mid-gray/10 cursor-pointer"
        >
          Reload
        </button>
      </div>
    </div>
  );
};
