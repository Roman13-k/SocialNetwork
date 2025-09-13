import React from "react";
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
} from "./alert-dialog";
import { Button } from "../buttons/button";

interface DeleteDialogProps {
  handleAction: () => void;
  triger?: React.ReactNode;
  trigerText?: string;
  description?: string;
  className?: string;
}

export default function DeleteDialog({
  handleAction,
  trigerText = "Exit",
  description = "This action cannot be undone",
  triger,
  className,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className ?? ""} asChild>
        {triger ? (
          triger
        ) : (
          <Button size={"lg"} variant={"dangerous"}>
            {trigerText}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"dangerous"} onClick={handleAction}>
            {trigerText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
