"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function SessionExpiredModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      router.push("/login"); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose, router]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-red-600">Session Expired</DialogTitle>
        </DialogHeader>

        <div className="text-zinc-700 dark:text-zinc-300 text-sm my-4">
          Your session has expired. Redirecting to login...
        </div>
      </DialogContent>
    </Dialog>
  );
}
