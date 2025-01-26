'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'
import {
  CharacterCount,
  CodeBlock,
  Color,
  Document,
  Dropcursor,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Link,
  Placeholder,
  Selection,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  Columns,
  Column,
  CustomCodeBlock,
  SqlSnippetNode,
  TaskItem,
  TaskList,
} from '.'

import { isChangeOrigin } from '@tiptap/extension-collaboration'

interface ExtensionKitProps {
  provider?: HocuspocusProvider  | null
}

export const ExtensionKit = ({ provider }: ExtensionKitProps) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  CustomCodeBlock,
  SqlSnippetNode,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  Focus,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
]

export default ExtensionKit
