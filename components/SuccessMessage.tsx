import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const SuccessMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "bg-green-50 border-green-200 text-green-800",
      className
    )}
    {...props}
  >
    <CardContent className="p-4">
      <div className="flex items-center space-x-2">
        <svg
          className="h-5 w-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-medium">Response submitted successfully!</p>
      </div>
    </CardContent>
  </Card>
));

SuccessMessage.displayName = "SuccessMessage";

export { SuccessMessage };