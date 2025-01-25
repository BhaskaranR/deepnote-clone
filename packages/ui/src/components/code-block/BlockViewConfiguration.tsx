import { BarChart2, Settings2, Table } from 'lucide-react'

import { Checkbox } from '../checkbox'
import { Label } from '../label'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../select'
import { ToggleGroup, ToggleGroupItem } from '../toggle-group'

import { ButtonTooltip } from '../button-tooltip'

interface BlockViewConfigurationProps {
  columns: string[]
  view: 'chart' | 'table'
  isChart: boolean
  lockColumns?: boolean
  changeView: (value: 'chart' | 'table') => void
}

export const BlockViewConfiguration = ({
  columns,
  view,
  isChart,
  lockColumns = false,
  changeView,
}: BlockViewConfigurationProps) => {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <ButtonTooltip
          id="help-popover-button"
          type="text"
          className="px-1"
          icon={<Settings2 size={14} />}
          tooltip={{ content: { side: 'bottom', text: 'View data' } }}
        />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" className="w-[240px] p-3">
        <form className="grid gap-2">
          <ToggleGroup
            type="single"
            value={view}
            className="w-full"
            onValueChange={(view: 'chart' | 'table') => {
              if (view) changeView(view)
            }}
          >
            <ToggleGroupItem className="w-full" value="table" aria-label="Show as table">
              <Table className="h-4 w-4" />
              <p className="text-xs ml-2">As table</p>
            </ToggleGroupItem>
            <ToggleGroupItem className="w-full" value="chart" aria-label="Show as chart">
              <BarChart2 className="h-4 w-4" />
              <p className="text-xs ml-2">As chart</p>
            </ToggleGroupItem>
          </ToggleGroup>

        </form>
      </PopoverContent>
    </Popover>
  )
}
