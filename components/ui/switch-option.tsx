"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  color = "green", // Default to green
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  color?: "green" | "blue" | "purple";
}) {
  const checkedColor =
    color === "green"
      ? "data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-green-400/70"
      : color === "blue"
      ? "data-[state=checked]:bg-sky-400 data-[state=unchecked]:bg-sky-400/70"
      : "data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-purple-400/60";

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-600",
        checkedColor,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }