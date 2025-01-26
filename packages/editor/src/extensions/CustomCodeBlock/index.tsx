import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { QueryBlock } from '@deepnote-clone/ui/query-block';

// NodeView Component for Tiptap
const QueryBlockNodeView = ({ node, updateAttributes }) => {
  const { label, sql, language, showSql } = node.attrs;

  const handleUpdateSql = (newSql) => {
    updateAttributes({ sql: newSql });
  };

  const handleUpdateShowSql = (value) => {
    updateAttributes({ showSql: value });
  };

  const handleUpdateLanguage = (newLanguage) => {
    if (['sql', 'python'].includes(newLanguage)) {
      updateAttributes({ language: newLanguage });
    }
  };

  return (
    <NodeViewWrapper>
      <QueryBlock
        lockColumns
        label={label}
        sql={sql}
        showSql={showSql}
        isLoading={false}
        draggable={false}
        runQuery={false}
        onRunQuery={() => {}}
        onDragStart={() => {}}
      />
    </NodeViewWrapper>
  );
};

// Custom Tiptap Extension
export const CustomCodeBlock = Node.create({
  name: 'queryBlock',
  group: 'block',

  content: 'text*',
  addAttributes() {
    return {
      label: {
        default: 'Query Block',
      },
      sql: {
        default: '',
      },
      language: {
        default: 'sql', // Default language
        parseHTML: (element) => element.getAttribute('data-language') || 'sql',
        renderHTML: (attributes) => ({
          'data-language': attributes.language,
        }),
      },
      showSql: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="query-block"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'query-block',
        'data-language': node.attrs.language,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(QueryBlockNodeView);
  },
});
