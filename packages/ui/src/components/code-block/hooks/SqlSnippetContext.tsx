import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SqlSnippetContextProps {
  registerSnippet: (id: string, executeFn: () => void) => void;
  runAllSnippets: () => void;
}

const SqlSnippetContext = createContext<SqlSnippetContextProps | undefined>(undefined);

export function SqlSnippetProvider({ children }: { children: ReactNode }) {
  const [snippets, setSnippets] = useState<Record<string, () => void>>({});

  const registerSnippet = (id: string, executeFn: () => void) => {
    setSnippets((prev) => ({ ...prev, [id]: executeFn }));
  };

  const runAllSnippets = () => {
    for (const executeFn of Object.values(snippets)) {
      executeFn();
    }
  };

  return (
    <SqlSnippetContext.Provider value={{ registerSnippet, runAllSnippets }}>
      {children}
    </SqlSnippetContext.Provider>
  );
}

export function useSqlSnippet() {
  const context = useContext(SqlSnippetContext);
  if (!context) {
    throw new Error('useSqlSnippet must be used within a SqlSnippetProvider');
  }
  return context;
}