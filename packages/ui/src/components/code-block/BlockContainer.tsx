import { GripHorizontal } from 'lucide-react'
import type { DragEvent, PropsWithChildren, ReactNode } from 'react'
import { cn } from '../../utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'

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

  return (
    <div
      draggable={draggable}
      unselectable={draggable ? 'on' : undefined}
      onDragStart={onDragStart}
      className="h-full flex flex-col overflow-hidden bg-surface-100 border-overlay relative rounded border shadow-sm"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'grid-item-drag-handle flex py-1 pl-3 pr-1 items-center gap-2 z-10 shrink-0 group',
              draggable && 'cursor-move'
            )}
          >
            <div
              className={cn(
                showDragHandle && 'transition-opacity opacity-100 group-hover:opacity-0'
              )}
            >
              {icon}
            </div>
            {showDragHandle && (
              <div className="absolute left-3 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <GripHorizontal size={16} strokeWidth={1.5} />
              </div>
            )}
            <h3 title={label} className="text-xs font-medium text-foreground-light flex-1 truncate">
              {label}
            </h3>
            <div className="flex items-center">{actions}</div>
          </div>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent asChild side="bottom">
            {tooltip}
          </TooltipContent>
        )}
      </Tooltip>
      <div
        className={cn(
          'flex flex-col flex-grow items-center justify-center',
          hasChildren && 'border-t'
        )}
      >
        {children}
      </div>
    </div>
  )
}
