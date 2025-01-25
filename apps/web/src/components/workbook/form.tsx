"use client";

import { ScrollArea } from "@deepnote-clone/ui/scroll-area";
import { EditBlock } from "./edit-block";
import { useFormContext } from "react-hook-form";

export function Form() {
  const form = useFormContext();
  // Submit the form and the draft invoice
  const handleSubmit = (values) => {
  };

  // Prevent form from submitting when pressing enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="relative h-full"
    onKeyDown={handleKeyDown}
  >
      <ScrollArea className="h-[calc(100vh-200px)] bg-background" hideScrollbar>
        <div className="p-8 pb-4 h-full flex flex-col">
          <EditBlock name="top_block" />
        </div>
      </ScrollArea>
      </form>
  );
}
