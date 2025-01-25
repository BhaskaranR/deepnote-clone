import { Code, Play } from 'lucide-react'
import  { DragEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { BlockContainer } from './BlockContainer'
import  { Parameter, parseParameters } from './sql-parameters'
import CodeBlock  from './CodeBlock'
import { ButtonTooltip } from '../button-tooltip'
import { LoadingSpinner } from '../loading-spinner'
import { SQL_ICON } from '@/icons'
import { cn } from '../../utils'


interface QueryBlockProps {
  /** Applicable if SQL is a snippet that's already saved (Used in Reports) */
  id?: string
  /** Title of the QueryBlock */
  label: string
  /** SQL query to render/run in the QueryBlock */
  sql?: string
  /** Not implemented yet: Will be the next part of ReportsV2 */
  parameterValues?: Record<string, string>
  /** Any other actions specific to the parent to be rendered in the header */
  actions?: ReactNode
  /** Toggle visiblity of SQL query on render */
  showSql?: boolean
  /** For Assistant as QueryBlock is rendered while streaming response */
  isLoading?: boolean
  /** Override to prevent running the SQL query provided */
  runQuery?: boolean
  /** Prevent updating of columns for X and Y axes in the chart view */
  lockColumns?: boolean
  /** Max height set to render results / charts (Defaults to 250) */
  maxHeight?: number
  /** Whether query block is draggable */
  draggable?: boolean
  /** Tooltip when hovering over the header of the block (Used in Assistant Panel) */
  tooltip?: ReactNode
  /** Not implemented yet: Will be the next part of ReportsV2 */
  onSetParameter?: (params: Parameter[]) => void
  /** Optional callback the SQL query is run */
  onRunQuery?: (queryType: 'select' | 'mutation') => void
  /** Optional callback on drag start */
  onDragStart?: (e: DragEvent<Element>) => void

  // [Joshen] Params below are currently only used by ReportsV2 (Might revisit to see how to improve these)
  /** Optional height set to render the SQL query (Used in Reports) */
  queryHeight?: number
  /** Override hiding Run Query button if SQL query is NOT readonly (Used in Reports) */
  disableRunIfMutation?: boolean
  /** UI to render if there's no query results (Used in Reports) */
  noResultPlaceholder?: ReactNode

}

export const QueryBlock = ({
  id,
  label,
  sql,
  maxHeight = 250,
  queryHeight,
  parameterValues: extParameterValues,
  actions,
  showSql: _showSql = false,
  isChart = false,
  isLoading = false,
  runQuery = false,
  lockColumns = false,
  draggable = false,
  disableRunIfMutation = false,
  noResultPlaceholder = null,
  tooltip,
  onRunQuery,
  onSetParameter,
  onDragStart,
}: QueryBlockProps) => {


  const [showSql, setShowSql] = useState(_showSql)
  const [queryResult, setQueryResult] = useState<any[]>()
  const [parameterValues, setParameterValues] = useState<Record<string, string>>({})
  const [showWarning, setShowWarning] = useState<'hasWriteOperation' | 'hasUnknownFunctions'>()

  const parameters = useMemo(() => {
    if (!sql) return []
    return parseParameters(sql)
  }, [sql])
  // [Joshen] This is for when we introduced the concept of parameters into our reports
  // const combinedParameterValues = { ...extParameterValues, ...parameterValues }

  // const { mutate: execute, isLoading: isExecuting } = useExecuteSqlMutation({
  //   onSuccess: (data) => setQueryResult(data.result),
  // })

  const handleExecute = () => {
  
  }

  // Run once on mount to parse parameters and notify parent
  useEffect(() => {
    if (!!sql && onSetParameter) {
      const params = parseParameters(sql)
      onSetParameter(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sql])

  useEffect(() => {
    // if (!!sql && !isLoading && runQuery && isReadOnlySelect(sql) && !!project) {
    //   handleExecute()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sql, isLoading, runQuery])

  return (
    <BlockContainer
      draggable={draggable}
      showDragHandle={draggable}
      tooltip={tooltip}
      onDragStart={(e: DragEvent<Element>) => onDragStart?.(e)}
      icon={
        <SQL_ICON
          className={cn(
            'transition-colors fill-foreground-muted group-aria-selected:fill-foreground',
            'w-5 h-5 shrink-0 grow-0 -ml-0.5'
          )}
          size={16}
          strokeWidth={1.5}
        />
      }
      label={label}
      actions={
        <>
          <ButtonTooltip
            type="button"
            size="icon"
            className="w-7 h-7"
            onClick={() => setShowSql(!showSql)}
            tooltip={{
              content: { side: 'bottom', text: showSql ? 'Hide query' : 'Show query' },
            }}
          >
            <Code size={14} />
          </ButtonTooltip>

          {/* <EditQueryButton id={id} title={label} sql={sql} /> */}

            <ButtonTooltip
              type="button"
              size="icon"
              className="w-7 h-7"
              disabled={isLoading}
              tooltip={{
                content: {
                  side: 'bottom',
                  className: 'max-w-56 text-center',
                  text: 'Run query',
                },
              }}
            >
              <Play size={14} />
            </ButtonTooltip>

          {actions}
        </>
      }
    >
   

      {isExecuting && queryResult === undefined && (
        <div className="p-3 w-full">
          <LoadingSpinner />
        </div>
      )}

      {showSql && (
        <div
          className="shrink-0 w-full max-h-96 overflow-y-auto"
          style={{ height: !!queryHeight ? `${queryHeight}px` : undefined }}
        >
          <CodeBlock
            hideLineNumbers
            wrapLines={false}
            value={sql}
            language="sql"
            className={cn(
              'max-w-none block !bg-transparent !py-3 !px-3.5 prose dark:prose-dark border-0 text-foreground !rounded-none w-full',
              '[&>code]:m-0 [&>code>span]:text-foreground'
            )}
          />
        </div>
      )}
    </BlockContainer>
  )
}
