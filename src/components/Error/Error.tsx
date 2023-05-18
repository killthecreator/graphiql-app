import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "~/components/ui";

import { useAppSelector } from "~/rtk";

export const Error = () => {
  const { error } = useAppSelector((state) => state.error);

  const errorButton = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" ref={errorButton} className="max-w-max">
          Error!
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-50">
        <AlertDialogHeader>
          {error.errors &&
            error.errors.map((err) => (
              <div key="ind">
                <AlertDialogTitle>
                  {err.code.replaceAll("_", " ")}
                </AlertDialogTitle>
                <AlertDialogDescription>{err.message}</AlertDialogDescription>
              </div>
            ))}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
