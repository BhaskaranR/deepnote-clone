"use client"

import { Button } from "@deepnote-clone/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@deepnote-clone/ui/dropdown-menu"
import { Calendar, ChevronDown, Play } from "lucide-react"
import { cn } from "@deepnote-clone/ui/cn"
export default function StatusBar({className}:{className?:string}) {
  return (
    <div className={cn("flex items-center gap-2 p-2 border rounded-lg bg-background", className)}>
      <div className="flex items-center gap-2 flex-1">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Play className="h-4 w-4" />
            Run
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Run Project</DropdownMenuItem>
          <DropdownMenuItem>Run Tests</DropdownMenuItem>
          <DropdownMenuItem>Run Debug</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="gap-2">
        <Calendar className="h-4 w-4" />
        Create app
      </Button>
    </div>
  )
}

