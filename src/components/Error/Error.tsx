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
  useAppSelector,
} from "~/rtk";

export const Error = () => {
  const { error, isError } = useAppSelector((state) => state.error);

  const errorButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isError) errorButton.current?.click();
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" ref={errorButton} className="absolute top-[-9999px]">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-50">
        <AlertDialogHeader>
          {error.errors && error.errors.map( (err, ind) => (
            <div key="ind">
              <AlertDialogTitle>{err.code.toLocaleLowerCase().replaceAll('_',' ')}</AlertDialogTitle>
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
