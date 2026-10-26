"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  id: string;
  currentStatus: string;
  type: "contact" | "quote";
  options: string[];
}

export function AdminStatusUpdater({ id, currentStatus, type, options }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/${type}s/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // Silent fail — status reverts
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isActive = status === opt;
        return (
          <button
            key={opt}
            onClick={() => updateStatus(opt)}
            disabled={saving || isActive}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all capitalize
              ${isActive
                ? "bg-sky/15 text-sky border border-sky/30 cursor-default"
                : "text-white/50 hover:text-white hover:bg-white/8 border border-transparent"
              }`}
          >
            <span>{opt.replace("_", " ")}</span>
            {isActive && (
              saving
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <CheckCircle2 className="w-3.5 h-3.5 text-sky" />
            )}
          </button>
        );
      })}

      {saved && (
        <p className="text-emerald text-xs text-center pt-1">✓ Status updated</p>
      )}
    </div>
  );
}
