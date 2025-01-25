"use client";

import { useProjectParams } from "@/hooks/use-project-params";
import { Button } from "@deepnote-clone/ui/button";
import {
  TableHeader as BaseTableHeader,
  TableHead,
  TableRow,
} from "@deepnote-clone/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";

export function TableHeader() {
  const { setParams, sort } = useProjectParams({ shallow: false });
  const [column, value] = sort || [];

  const createSortQuery = (name: string) => {
    const [currentColumn, currentValue] = sort || [];

    if (name === currentColumn) {
      if (currentValue === "asc") {
        setParams({ sort: [name, "desc"] });
      } else if (currentValue === "desc") {
        setParams({ sort: null });
      } else {
        setParams({ sort: [name, "asc"] });
      }
    } else {
      setParams({ sort: [name, "asc"] });
    }
  };

  return (
    <BaseTableHeader>
      <TableRow>
        <TableHead>
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("name")}
          >
            <span>Name</span>
            {"name" === column && value === "asc" && <ArrowDown size={16} />}
            {"name" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("status")}
          >
            <span>Status</span>
            {"status" === column && value === "asc" && <ArrowDown size={16} />}
            {"status" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("sharing")}
          >
            <span>Sharing</span>
            {"sharing" === column && value === "asc" && <ArrowDown size={16} />}
            {"sharing" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("author")}
          >
            <span>Author</span>
            {"author" === column && value === "asc" && <ArrowDown size={16} />}
            {"author" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("created_at")}
          >
            <span>Created At</span>
            {"created_at" === column && value === "asc" && <ArrowDown size={16} />}
            {"created_at" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <Button
            className="p-0 hover:bg-transparent space-x-2"
            variant="ghost"
            onClick={() => createSortQuery("last_opened_at")}
          >
            <span>Last Opened At</span>
            {"last_opened_at" === column && value === "asc" && <ArrowDown size={16} />}
            {"last_opened_at" === column && value === "desc" && <ArrowUp size={16} />}
          </Button>
        </TableHead>
      </TableRow>
    </BaseTableHeader>
  );
}
