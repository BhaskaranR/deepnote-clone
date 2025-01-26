import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { SqlSnippet} from '@deepnote-clone/ui/sql-snippet';

// NodeView Component for Tiptap
const SqlSnippetNodeView = ({ node }) => {
  const { id, sql, title, resultType, mockData } = node.attrs;


  return (
    <NodeViewWrapper>
      <SqlSnippet
        id={id}
        sql={sql}
        title={title}
        resultType={resultType}
        mockData={mockData}
      />
    </NodeViewWrapper>
  );
};

// Custom Tiptap Node
export const SqlSnippetNode = Node.create({
  name: 'sqlSnippet', // Node name for the extension
  group: 'block', // Grouping as a block-level node

  addAttributes() {
    return {
      id: {
        default: 'snippet-1', // Default ID for the snippet
      },
      sql: {
        default: '', // The SQL query
      },
      title: {
        default: 'SQL Query', // Default title for the snippet
      },
      resultType: {
        default: 'table', // Default result type: 'chart' or 'table'
      },
      mockData: {
        default: null, // Mock data for the query result
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="sql-snippet"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'sql-snippet',
        'data-id': node.attrs.id,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SqlSnippetNodeView);
  },
});
