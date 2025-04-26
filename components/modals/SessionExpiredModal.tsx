"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SessionExpiredModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-red-600">Session Expired</DialogTitle>
        </DialogHeader>

        <div className="text-zinc-700 dark:text-zinc-300 text-sm my-4">
          Your session has expired. Please log in again to continue.
        </div>

        <DialogFooter>
          <Button onClick={onLogin} className="bg-red-500 hover:bg-red-600 text-white rounded-md">
            Go to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
