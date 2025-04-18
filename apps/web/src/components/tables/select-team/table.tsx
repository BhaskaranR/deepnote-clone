"use client";

import { changeTeamAction } from "@/actions/change-team-action";
import { joinTeamAction } from "@/actions/join-team-action";
import { Avatar, AvatarFallback, AvatarImage } from "@deepnote-clone/ui/avatar";
import { Button } from "@deepnote-clone/ui/button";
import { SubmitButton } from "@deepnote-clone/ui/submit-button";
import { Table, TableBody, TableCell, TableRow } from "@deepnote-clone/ui/table";
import { useAction } from "next-safe-action/hooks";


export function SelectTeamTable({ data, pendingInvites }) {
  const changeTeam = useAction(changeTeamAction);
  const join = useAction(joinTeamAction);

  return (
    <Table>
      <TableBody>
        {pendingInvites.map((row) => (
          <TableRow key={row.id} className="hover:bg-transparent">
            <TableCell className="border-r-[0px] py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-full w-8 h-8">
                  <AvatarImage src={row?.team?.avatar_url} />
                  <AvatarFallback>
                    <span className="text-xs">
                      {row.team?.team_name?.charAt(0)?.toUpperCase()}
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {row.team?.team_name}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <div className="flex space-x-3 items-center">
                  <SubmitButton
                    isSubmitting={join.isExecuting}
                    disabled={join.isExecuting}
                    variant="outline"
                    onClick={() =>
                      join.execute({
                        code: row.code,
                      })
                    }
                  >
                    Join
                  </SubmitButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {data.map((row) => (
          <TableRow key={row.id} className="hover:bg-transparent">
            <TableCell className="border-r-[0px] py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-full w-8 h-8">
                  <AvatarImage src={row?.avatar_url} />
                  <AvatarFallback>
                    <span className="text-xs">
                      {row.team_name?.charAt(0)?.toUpperCase()}
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {row.team_name}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <div className="flex space-x-3 items-center">
                  <Button
                    variant="outline"
                    onClick={() =>
                      changeTeam.execute({
                        teamId: row.id,
                        redirectTo: "/",
                      })
                    }
                  >
                    Launch
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
