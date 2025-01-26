import { useEffect, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import type { AnyExtension, Editor } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import type { Doc as YDoc } from 'yjs'

import { ExtensionKit } from '../extensions/extension-kit'
import type { EditorUser } from '../components/BlockEditor/types'
import { initialContent } from '../lib/data/initialContent'
import { Ai } from '../extensions/Ai'
import { transformDemoQueriesToTiptapContent } from '../lib/data/newContent'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  aiToken,
  ydoc,
  provider,
  userId,
  userName = 'Maxi',
}: {
  aiToken?: string
  ydoc: YDoc | null
  provider?: TiptapCollabProvider | null | undefined
  userId?: string
  userName?: string
}) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  )
  const [content, setContent] = useState(transformDemoQueriesToTiptapContent())
  console.log("Baba Content",content)

  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: content,
      onCreate: ctx => {
        ctx.editor.commands.focus('start', { scrollIntoView: true })
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        provider && ydoc
          ? Collaboration.configure({
              document: ydoc,
            })
          : undefined,
        aiToken ? Ai.configure({ token: aiToken }) : undefined,
      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full min-w-full',
        },
      },
    },
    [ydoc, provider],
  )
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return []
      }

      return ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
        const names = user.name?.split(' ')
        const firstName = names?.[0]
        const lastName = names?.[names.length - 1]
        const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

        return { ...user, initials: initials.length ? initials : '?' }
      })
    },
  })

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status)
    })
  }, [provider])

  window.editor = editor

  return { editor, users, collabState }
}
