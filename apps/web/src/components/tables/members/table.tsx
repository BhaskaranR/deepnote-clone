"use client";

import { changeUserRoleAction } from "@/actions/change-user-role-action";
import { deleteTeamMemberAction } from "@/actions/delete-team-member-action";
import { leaveTeamAction } from "@/actions/leave-team-action";
import { InviteTeamMembersModal } from "@/components/modals/invite-team-members-modal";
import { useI18n } from "@/locales/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@deepnote-clone/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@deepnote-clone/ui/avatar";
import { Button } from "@deepnote-clone/ui/button";
import { cn } from "@deepnote-clone/ui/cn";
import { Dialog } from "@deepnote-clone/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@deepnote-clone/ui/dropdown-menu";
import { Input } from "@deepnote-clone/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@deepnote-clone/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@deepnote-clone/ui/table";
import { useToast } from "@deepnote-clone/ui/use-toast";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import * as React from "react";

interface MemberRow {
  id: string;
  // Add other properties as needed
}

export const columns = [
  {
    id: "member",
    accessorKey: "user.full_name",
    header: () => "Select all",
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex items-center space-x-4">
            <Avatar className="rounded-full w-8 h-8">
              <AvatarImage src={row.original.user?.avatar_url} />
              <AvatarFallback>
                <span className="text-xs">
                  {row.original.user?.full_name?.charAt(0)?.toUpperCase()}
                </span>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {row.original.user?.full_name}
              </span>
              <span className="text-sm text-[#606060]">
                {row.original.user?.email}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const t = useI18n();
      const router = useRouter();
      const { toast } = useToast();
      const changeUserRole = useAction(changeUserRoleAction, {
        onSuccess: () => {
          toast({
            title: "Team role has been updated.",
            duration: 3500,
            variant: "success",
          });
        },
        onError: () => {
          toast({
            duration: 3500,
            variant: "error",
            title: "Something went wrong please try again.",
          });
        },
      });

      const deleteTeamMember = useAction(deleteTeamMemberAction, {
        onSuccess: () => {
          toast({
            title: "Team member removed.",
            duration: 3500,
            variant: "success",
          });
        },
        onError: () => {
          toast({
            duration: 3500,
            variant: "error",
            title: "Something went wrong please try again.",
          });
        },
      });

      const leaveTeam = useAction(leaveTeamAction, {
        onSuccess: () => router.push("/teams"),
        onError: () => {
          toast({
            duration: 3500,
            variant: "error",
            title:
              "You cannot leave since you are the only remaining owner of the team. Delete this team instead.",
          });
        },
      });

      return (
        <div className="flex justify-end">
          <div className="flex space-x-2 items-center">
            {(table.options.meta.currentUser.role === "owner" &&
              table.options.meta.currentUser.user.id !==
                row.original.user?.id) ||
            (table.options.meta.currentUser.role === "owner" &&
              table.options.meta.totalOwners > 1) ? (
              <Select
                value={row.original.role}
                onValueChange={(role) => {
                  changeUserRole.execute({
                    userId: row.original.user?.id,
                    teamId: row.original.team_id,
                    role: role as "owner" | "member",
                    revalidatePath: "/settings/members",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(`roles.${row.original.role}`, {
                      defaultValue: row.original.role,
                      count: 1,
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-sm text-[#606060]">
                {t(`roles.${row.original.role}`, {
                  defaultValue: row.original.role,
                  count: 1,
                })}
              </span>
            )}

            {table.options.meta.currentUser.role === "owner" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table.options.meta.currentUser.user.id !==
                    row.original.user?.id && (
                    <AlertDialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        asDialogTrigger
                      >
                        <AlertDialogTrigger>Remove Member</AlertDialogTrigger>
                      </DropdownMenuItem>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Remove Team Member
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You are about to remove the following Team Member,
                            are you sure you want to continue?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={deleteTeamMember.status === "executing"}
                            onClick={() =>
                              deleteTeamMember.execute({
                                userId: row.original.user?.id,
                                teamId: row.original.team_id,
                                revalidatePath: "/settings/members",
                              })
                            }
                          >
                            {deleteTeamMember.status === "executing" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {table.options.meta.currentUser.user.id ===
                    row.original.user?.id && (
                    <AlertDialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        asDialogTrigger
                      >
                        <AlertDialogTrigger>Leave Team</AlertDialogTrigger>
                      </DropdownMenuItem>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Leave Team</AlertDialogTitle>
                          <AlertDialogDescription>
                            You are about to leave this team. In order to regain
                            access at a later time, a Team Owner must invite
                            you.
                            <p className="mt-4">
                              Are you sure you want to continue?
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={leaveTeam.status === "executing"}
                            onClick={() =>
                              leaveTeam.execute({
                                teamId: row.original.team_id,
                                role: row.original.role,
                              })
                            }
                          >
                            {leaveTeam.status === "executing" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      );
    },
    meta: {
      className: "text-right",
    },
  },
];

export function DataTable({ data, currentUser }) {
  const [isOpen, onOpenChange] = React.useState(false);

  const table = useReactTable({
    getRowId: (row: MemberRow) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      currentUser,
      totalOwners: data.filter((member) => member.role === "owner").length,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 space-x-4">
        <Input
          className="flex-1"
          placeholder="Search..."
          value={(table.getColumn("member")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("member")?.setFilterValue(event.target.value)
          }
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <Button onClick={() => onOpenChange(true)}>Invite member</Button>
          <InviteTeamMembersModal onOpenChange={onOpenChange} isOpen={isOpen} />
        </Dialog>
      </div>
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent"
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
    </div>
  );
}
