import { GripHorizontal } from 'lucide-react'
import type { DragEvent, PropsWithChildren, ReactNode } from 'react'
import { cn } from '../../utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { Card } from '../card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table"
import { Button } from "../button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { Input } from "../input"
import { Database, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Eye, EyeOff } from "lucide-react"
import { useState } from 'react'

interface BlockContainerProps {
  icon: ReactNode
  label: string
  actions: ReactNode
  draggable?: boolean
  showDragHandle?: boolean
  tooltip?: ReactNode
  onDragStart?: (e: DragEvent) => void
}

export const BlockContainer = ({
  icon,
  label,
  actions,
  draggable = false,
  showDragHandle = false,
  tooltip,
  onDragStart,
  children,
}: PropsWithChildren<BlockContainerProps>) => {
  const hasChildren = Array.isArray(children)
    ? children.filter(Boolean).filter((x) => !!x.props.children).length > 0
    : !!children

  const [isSchemaVisible, setIsSchemaVisible] = useState(false);

  const toggleSchemaVisibility = () => {
    setIsSchemaVisible(!isSchemaVisible);
  };

  return (
    <Card className="w-full grid">
    <div className="p-4 border-b">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <Select defaultValue="postgres">
            <SelectTrigger className="w-[180px] text-xs">
              <SelectValue placeholder="Select database" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="postgres">[Demo] Postgres</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Variable:</span>
          <Input defaultValue="visits" className="w-[200px]" />
        </div>
        <div className="flex-1"/>
        <Button variant="ghost" className='text-xs flex items-center gap-1' onClick={toggleSchemaVisibility}>
          {isSchemaVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isSchemaVisible ? 'Hide schema' : 'Show schema'}
        </Button>
      </div>
    </div>
    <div className="px-2">
      {children}
    </div>
    </Card>
  )
}
