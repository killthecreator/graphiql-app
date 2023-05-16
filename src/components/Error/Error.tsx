import { useEffect, useRef } from "react";
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
Button,
} from "~/components/ui";

import {
  useAppDispatch,
  useAppSelector,
} from "~/rtk";

export const Error = () => {
  const { error, isError } = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  const errorButton = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={errorButton} className="max-w-max">Error!</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-50">
        <AlertDialogHeader>
          {error.errors && error.errors.map( (err, ind) => (
            <div key="ind">
              <AlertDialogTitle>{err.code.replaceAll('_',' ')}</AlertDialogTitle>
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
}
