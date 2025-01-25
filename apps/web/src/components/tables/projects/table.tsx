"use client";

import { Button } from "@deepnote-clone/ui/button";
import { cn } from "@deepnote-clone/ui/cn";
import { Dialog, DialogTrigger } from "@deepnote-clone/ui/dialog";

import { Input } from "@deepnote-clone/ui/input";
import { Skeleton } from "@deepnote-clone/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@deepnote-clone/ui/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { TableHeader } from "./table-header";
import { formatDistanceToNow } from "date-fns";

import { useRouter } from "next/navigation";
export const columns = [
  {
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.original.name}</span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.status}</span>
    ),
  },
  {
    id: "sharing",
    accessorKey: "sharing",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.sharing}</span>
    ),
  },
  {
    id: "author",
    accessorKey: "author",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.author}</span>
    ),
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    cell: ({ row }) => (
      <span className="text-sm">{new Date(row.original.created_at).toLocaleString()}</span>
    ),
  },
  {
    id: "last_opened_at",
    accessorKey: "last_opened_at",
    cell: ({ row }) => (
      <span className="text-sm">
        {formatDistanceToNow(new Date(row.original.last_opened_at), { addSuffix: true })}
      </span>
    ),
  },
];

export function ProjectsSkeleton() {
  return (
    <div className="w-full">
    
      <div className="flex items-center pb-4 space-x-4">
        {/* Add a Header with the title "Private Projects" */}
        <h1 className="text-2xl font-bold">Private Projects</h1>
        <div className="flex-1"/>
        <Input
          className="ml-auto"
          placeholder="Filter..."
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
        <Button disabled>Create project</Button>
      </div>

      <Table>
        <TableBody>
          {[...Array(6)].map((_, index) => (
            <TableRow key={index.toString()} className="hover:bg-transparent">
              <TableCell className={cn("border-r-[0px] py-4")}>
                <div className="flex items-center space-x-4">
                  <Skeleton className="rounded-full w-8 h-8" />

                  <div className="flex flex-col space-y-2">
                    <Skeleton className="w-[200px] h-3" />
                    <Skeleton className="w-[100px] h-3" />
                    <Skeleton className="w-[120px] h-3" />
                    <Skeleton className="w-[150px] h-3" />
                    <Skeleton className="w-[180px] h-3" />
                    <Skeleton className="w-[180px] h-3" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function DataTableHeader({ table }) {
  const [isOpen, onOpenChange] = React.useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex items-center pb-4 space-x-4">
        <h1 className="text-2xl font-bold">Private Projects</h1>
        <div className="flex-1"/>
        <Input
          className="ml-auto w-[200px]"
          placeholder="Filter"
          value={(table?.getColumn("team")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("team")?.setFilterValue(event.target.value)
          }
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
        <DialogTrigger asChild>
          <Button>Create project</Button>
        </DialogTrigger>
      </div>
    </Dialog>
  );
}

export function DataTable({ data }) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTableHeader table={table} />
      <Table>
        <TableHeader/>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent cursor-pointer"
                onClick={() => router.push(`/projects/${row.original.id}`)}
              >
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "border-r-[0px] py-4",
                      (cell.column.columnDef.meta as { className?: string })
                        ?.className,
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

