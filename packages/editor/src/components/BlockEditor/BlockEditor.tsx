import { EditorContent } from "@tiptap/react";
import React, { useRef } from "react";

import { useBlockEditor } from "../../hooks/useBlockEditor";
import "../../styles/index.css";

import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
// import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { useSidebar } from "../../hooks/useSidebar";
import { LinkMenu } from "../menus";
import StatusBar from "./components/Status";
import { SqlSnippetProvider } from "@deepnote-clone/ui/hooks/SqlSnippetContext";

export const BlockEditor = ({
  aiToken,
}: {
  aiToken?: string;
}) => {
  const menuContainerRef = useRef(null);

  const leftSidebar = useSidebar();
  const { editor, users, collabState } = useBlockEditor({
    aiToken,
    ydoc: null,
    provider: undefined,
  });

  if (!editor || !users) {
    return null;
  }

  return (
    <SqlSnippetProvider>
      <div className="flex h-full" ref={menuContainerRef}>
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">
          <StatusBar className="mt-10" />
          <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </SqlSnippetProvider>
  );
};

export default BlockEditor;
