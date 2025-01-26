import { Check, Copy } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import kotlin from 'react-syntax-highlighter/dist/cjs/languages/hljs/kotlin'
import py from 'react-syntax-highlighter/dist/cjs/languages/hljs/python'
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import { Button } from '../button'
import { cn } from '../../utils'
import monokaiCustomTheme from './CodeBlock.utils'

export type LANG = 'js' | 'sql' | 'py' | 'bash' | 'ts' | 'tsx' | 'kotlin' | 'yaml'
export interface CodeBlockProps {
  lang: LANG
  startingLineNumber?: number
  hideCopy?: boolean
  showLineNumbers?: boolean
  className?: string
  children?: string
  size?: 'small' | 'medium' | 'large'
  background?: string
}

function CodeBlock(props: CodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme?.includes('dark')!
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  const firstLine = props.children ? props.children.split('\n')[0] : ''

  let filename = ''

  if (firstLine.includes('filename =')) {
    filename = firstLine.split('=')[1]
  }

  const content =
    props.children && filename ? props.children.replace(`${firstLine}\n\n`, '') : props.children

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  let lang = props.lang
    ? props.lang
    : props.className
      ? props.className.replace('language-', '')
      : 'js'
  // force jsx to be js highlighted
  if (lang === 'jsx') lang = 'js'

  SyntaxHighlighter.registerLanguage('js', js)
  SyntaxHighlighter.registerLanguage('py', py)
  SyntaxHighlighter.registerLanguage('sql', sql)
  SyntaxHighlighter.registerLanguage('bash', bash)
  SyntaxHighlighter.registerLanguage('kotlin', kotlin)
  SyntaxHighlighter.registerLanguage('yaml', yaml)

  // const large = props.size === 'large' ? true : false
  const large = false

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative" >
        {/* @ts-ignore */}
        <SyntaxHighlighter
          language={lang}
          style={isDarkTheme ? monokaiCustomTheme.dark : monokaiCustomTheme.light}
          className={cn(
            'bg-yellow synthax-highlighter rounded-lg',
            !filename && 'rounded-t-lg',
            'rounded-b-lg',
            props.className
          )}
          customStyle={{
            padding: props.showLineNumbers
              ? large
                ? '1.25rem 1rem'
                : '1rem 0.8rem'
              : large
                ? '1.25rem 1.5rem'
                : '1.25rem 1.5rem',
            fontSize: large ? 18 : '0.775rem',
            lineHeight: large ? 1.6 : 1.4,
          }}
          contentEditable={true}
          showLineNumbers={props.showLineNumbers}
          lineNumberStyle={{
            padding: '0px',
            marginRight: '21px',
            minWidth: '1.5em',
            opacity: '0.3',
            fontSize: large ? 14 : '0.75rem',
          }}
        >
          {content}
        </SyntaxHighlighter>
        {!props.hideCopy && props.children ? (
          <div className="absolute right-2 top-2">
            <CopyToClipboard text={props.children}>
              <Button
                type="button"
                onClick={() => handleCopy()}
                aria-label="Copy"
                size='icon'
                variant='ghost'
              >
                {
                  copied ? (
                    <span className="text-brand">
                      <Check strokeWidth={3} size={16} className='w-4 h-4' />
                    </span>
                  ) : (
                    <Copy className='w-4 h-4' />
                  )
                }
                </Button>
            </CopyToClipboard>
          </div>
        ) : null}
    </div>
  )
}

export default CodeBlock
