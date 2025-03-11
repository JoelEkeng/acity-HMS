'use client'

import { Button } from "@/components/layout/Button"
import { AlertTriangle } from "lucide-react/icons"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full space-y-6 p-6 rounded-lg bg-card shadow-xl">
        <div className="flex justify-center mb-4">
          <AlertTriangle 
            className="text-destructive" 
            size={64} 
            strokeWidth={1.5} 
          />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground">
          Something Went Wrong
        </h1>
        
        <p className="text-muted-foreground mb-4">
          We encountered an unexpected error. Don&apos;t worry, you can try again.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted p-3 rounded-md text-left mb-4 overflow-x-auto">
            <code className="text-xs text-destructive">
              {error.message}
            </code>
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => reset()}
            variant="default"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}