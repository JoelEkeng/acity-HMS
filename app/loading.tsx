'use client'

import { Loader2 } from "lucide-react"


export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-sm space-y-4 text-center">
        <div className="flex justify-center">
          <Loader2 
            className="animate-spin text-primary" 
            size={64} 
            strokeWidth={1.5} 
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Loading
          </h2>
          
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your content
          </p>
        </div>
        
      </div>
    </div>
  )
}